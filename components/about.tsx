"use client";

const CARDS = [
  {
    eyebrow: "Career",
    title: "Data platform PM across three industries.",
    body: "Ticketmaster (checkout & reporting), theScore (sports API platform), and Lululemon (merchandise systems) — five-plus years turning messy data into decisions people can trust.",
  },
  {
    eyebrow: "Impact",
    title: "56% faster, 75% cheaper.",
    body: "Rebuilt theScore's sports API platform to cut latency by 56% and infrastructure cost by 75%, on systems serving 5M+ users.",
  },
  {
    eyebrow: "Focus",
    title: "One problem, many domains.",
    body: "Ticketing, sports, and retail look different on the surface, but the work is the same: source-of-truth data and the systems that make it trustworthy.",
  },
  {
    eyebrow: "Certifications",
    title: "AWS Cloud & AI Practitioner.",
    body: "Certified AWS Cloud Practitioner and AI Practitioner, grounding product decisions in how the platform actually works.",
  },
] as const;

export function About() {
  return (
    <section id="about">
      <div className="about-inner">
        <div className="about-head">
          <h2 className="about-headline">
            Why I build products that turn messy data into decisions people can trust.
          </h2>
          <a href="#contact" className="about-head-link">
            Get in touch <span aria-hidden="true">›</span>
          </a>
        </div>

        <div className="about-card-row">
          {CARDS.map((card) => (
            <article key={card.eyebrow} className="about-card">
              <p className="about-card-eyebrow">{card.eyebrow}</p>
              <h3 className="about-card-title">{card.title}</h3>
              <p className="about-card-body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}