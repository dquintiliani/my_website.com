"use client";

const CONTACT_LINKS = [
  {
    href: "mailto:dquintilian@gmail.com",
    icon: "✉",
    label: "dquintilian@gmail.com",
  },
  {
    href: "https://linkedin.com/in/dominic-quintilian",
    icon: "in",
    label: "dominic-quintilian",
  },
  {
    href: "https://github.com/dquintiliani",
    icon: "⌥",
    label: "dquintiliani",
  },
] as const;

export function Footer() {
  const handleBackToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="bg-[var(--black)] pt-16">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        {/* ── Top row ── */}
        <div className="flex flex-col items-start gap-12 border-b border-white/[0.08] pb-10 text-left md:grid md:grid-cols-3 md:gap-12 md:pb-14">
          {/* Brand */}
          <div className="flex w-full flex-col items-start text-left">
            <p className="mb-4 font-(family-name:--font-display) text-[32px] font-black italic leading-none tracking-[-0.04em] text-(--footer-ink)">
              Dominic Quintilian
              <span className="text-(--footer-green)">.</span>
            </p>
            <p className="max-w-[220px] text-sm font-light leading-[1.7] text-(--footer-ink)/55">
              Building data products that teams{" "}
              <em className="italic text-(--footer-ink)/75">
                actually depend on.
              </em>
            </p>
          </div>

          {/* Availability */}
          <div className="flex w-full flex-col items-start gap-6 text-left">
            <div>
              <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-(--footer-ink)/55">
                Status
              </p>
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="pulse-dot h-2 w-2 flex-shrink-0 rounded-full bg-(--footer-green)" />
                <span className="text-[15px] font-medium tracking-[-0.01em] text-(--footer-ink)">
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex w-full flex-col items-start text-left">
            <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-(--footer-ink)/55">
              Get in touch
            </p>
            <div className="flex flex-col gap-3">
              {CONTACT_LINKS.map(({ href, icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group flex items-center gap-2.5 text-[13px] tracking-[0.01em] text-(--footer-ink)/70 transition-colors duration-150 hover:text-(--footer-ink)"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-xs text-(--footer-ink)/50 transition-colors duration-150 group-hover:bg-(--footer-green) group-hover:text-white">
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom strip ── */}
        <div className="flex flex-col-reverse items-start gap-6 py-6 pb-10 text-left md:flex-row md:items-center md:justify-between md:py-5">
          <span className="text-[11px] tracking-[0.04em] text-(--footer-ink)/55">
            Dominic Quintilian · Toronto, ON · © 2026
          </span>
          <button
            onClick={handleBackToTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 border-none bg-transparent p-0 font-inherit text-[11px] font-medium uppercase tracking-[0.06em] text-(--footer-ink)/55 transition-colors duration-150 hover:text-(--footer-ink)/80"
          >
            <span className="block h-px w-6 bg-(--footer-ink)/20" />
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
