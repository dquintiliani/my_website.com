/**
 * Minimal Markdown renderer — covers the subset used in the articles:
 * headings (##, ###), bold (**), paragraphs, horizontal rules.
 * For richer MDX later, swap this out for next-mdx-remote or @next/mdx.
 */
export function renderMarkdown(md: string): string {
  const lines = md.split("\n")
  const output: string[] = []
  let inParagraph = false

  const closeParagraph = () => {
    if (inParagraph) {
      output.push("</p>")
      inParagraph = false
    }
  }

  const inlineProcess = (text: string) =>
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")

  for (const raw of lines) {
    const line = raw.trimEnd()

    if (line.startsWith("## ")) {
      closeParagraph()
      output.push(`<h2>${inlineProcess(line.slice(3))}</h2>`)
    } else if (line.startsWith("### ")) {
      closeParagraph()
      output.push(`<h3>${inlineProcess(line.slice(4))}</h3>`)
    } else if (line.startsWith("---")) {
      closeParagraph()
      output.push("<hr />")
    } else if (line === "") {
      closeParagraph()
    } else {
      if (!inParagraph) {
        output.push("<p>")
        inParagraph = true
      } else {
        output.push(" ")
      }
      output.push(inlineProcess(line))
    }
  }

  closeParagraph()
  return output.join("")
}