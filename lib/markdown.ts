/**
 * Deterministic Markdown renderer for article content.
 *
 * Supports: headings (##/###), paragraphs, bold/italic/inline code, links,
 * images, blockquotes, ordered/unordered lists, fenced code blocks, tables,
 * and horizontal rules — i.e. everything `.prose` in app/styles/sections/blog.css
 * already has styles for. Pure string transform, no external deps and no
 * arbitrary code execution: output is always escaped HTML built from a fixed
 * set of tags, so it's safe to feed straight into dangerouslySetInnerHTML.
 */

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

// Run on text that has already been through escapeHtml — only quotes are left unescaped.
function escapeAttr(text: string): string {
  return text.replace(/"/g, "&quot;")
}

function inlineProcess(raw: string): string {
  let text = escapeHtml(raw)

  text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_m, alt, src) => {
    return `<img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" />`
  })

  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, href) => {
    const external = /^https?:\/\//.test(href)
    const rel = external ? ` target="_blank" rel="noopener noreferrer"` : ""
    return `<a href="${escapeAttr(href)}"${rel}>${label}</a>`
  })

  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
}

function splitTableRow(row: string): string[] {
  let r = row.trim()
  if (r.startsWith("|")) r = r.slice(1)
  if (r.endsWith("|")) r = r.slice(0, -1)
  return r.split("|").map((cell) => cell.trim())
}

const isTableSeparator = (line: string) =>
  /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?$/.test(line.trim())

const UL_ITEM = /^[-*]\s+(.*)$/
const OL_ITEM = /^\d+\.\s+(.*)$/
const BLOCKQUOTE = /^>\s?(.*)$/

export function renderMarkdown(md: string): string {
  const lines = md.split("\n")
  const output: string[] = []

  let i = 0
  let inParagraph = false
  let listType: "ul" | "ol" | null = null

  const closeParagraph = () => {
    if (inParagraph) {
      output.push("</p>")
      inParagraph = false
    }
  }

  const closeList = () => {
    if (listType) {
      output.push(`</${listType}>`)
      listType = null
    }
  }

  while (i < lines.length) {
    const line = lines[i].trimEnd()
    const trimmed = line.trimStart()

    // Fenced code block
    if (trimmed.startsWith("```")) {
      closeParagraph()
      closeList()
      const lang = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing fence
      const langAttr = lang ? ` class="language-${escapeHtml(lang)}"` : ""
      output.push(`<pre><code${langAttr}>${codeLines.map(escapeHtml).join("\n")}</code></pre>`)
      continue
    }

    if (line.startsWith("## ")) {
      closeParagraph()
      closeList()
      output.push(`<h2>${inlineProcess(line.slice(3))}</h2>`)
      i++
      continue
    }

    if (line.startsWith("### ")) {
      closeParagraph()
      closeList()
      output.push(`<h3>${inlineProcess(line.slice(4))}</h3>`)
      i++
      continue
    }

    if (/^-{3,}$/.test(trimmed)) {
      closeParagraph()
      closeList()
      output.push("<hr />")
      i++
      continue
    }

    const bq = trimmed.match(BLOCKQUOTE)
    if (bq) {
      closeParagraph()
      closeList()
      const quoteLines: string[] = [bq[1]]
      i++
      while (i < lines.length) {
        const next = lines[i].trimStart().match(BLOCKQUOTE)
        if (!next) break
        quoteLines.push(next[1])
        i++
      }
      output.push(`<blockquote><p>${quoteLines.map(inlineProcess).join(" ")}</p></blockquote>`)
      continue
    }

    // Table: a row containing "|" immediately followed by a separator row
    if (trimmed.includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      closeParagraph()
      closeList()
      const headerCells = splitTableRow(trimmed)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim() !== "" && lines[i].includes("|")) {
        rows.push(splitTableRow(lines[i]))
        i++
      }
      output.push("<table><thead><tr>")
      for (const cell of headerCells) output.push(`<th>${inlineProcess(cell)}</th>`)
      output.push("</tr></thead><tbody>")
      for (const row of rows) {
        output.push("<tr>")
        for (const cell of row) output.push(`<td>${inlineProcess(cell)}</td>`)
        output.push("</tr>")
      }
      output.push("</tbody></table>")
      continue
    }

    const ul = trimmed.match(UL_ITEM)
    if (ul) {
      closeParagraph()
      if (listType !== "ul") {
        closeList()
        output.push("<ul>")
        listType = "ul"
      }
      output.push(`<li>${inlineProcess(ul[1])}</li>`)
      i++
      continue
    }

    const ol = trimmed.match(OL_ITEM)
    if (ol) {
      closeParagraph()
      if (listType !== "ol") {
        closeList()
        output.push("<ol>")
        listType = "ol"
      }
      output.push(`<li>${inlineProcess(ol[1])}</li>`)
      i++
      continue
    }

    if (line === "") {
      closeParagraph()
      closeList()
      i++
      continue
    }

    closeList()
    if (!inParagraph) {
      output.push("<p>")
      inParagraph = true
    } else {
      output.push(" ")
    }
    output.push(inlineProcess(line))
    i++
  }

  closeParagraph()
  closeList()
  return output.join("")
}
