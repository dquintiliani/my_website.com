export function Writing() {
  const articles = [
    {
      date: "Date TBD",
      title:
        "[Article or Talk Title \u2014 e.g., \u201CWhy \u2018What do users want?\u2019 is the wrong first question\u201D]",
      desc: "[Brief description \u2014 e.g., \u201CA short essay on reframing discovery to uncover latent needs rather than surface requests.\u201D]",
      href: "#",
    },
    {
      date: "Date TBD",
      title: "[Second Article or Talk]",
      desc: "[Brief description]",
      href: "#",
    },
    {
      date: "Date TBD",
      title: "[Third Article or Talk]",
      desc: "[Brief description \u2014 e.g., \u201CSlides from a talk given at [event] on the product lessons from building in ambiguous early-stage environments.\u201D]",
      href: "#",
    },
  ]

  return (
    <section id="writing">
      <div className="writing-inner">
        <p className="section-label">{"Writing & Talks"}</p>
        <h2 className="section-title">{"Ideas & perspectives."}</h2>
        <div className="divider"></div>
        <div className="writing-list">
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.href}
              className="writing-item fade-in-element"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="writing-date">{article.date}</span>
              <div className="writing-content">
                <p className="writing-title">{article.title}</p>
                <p className="writing-desc">{article.desc}</p>
              </div>
              <span className="writing-arrow">{"\u2192"}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
