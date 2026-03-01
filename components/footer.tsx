export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-logo">
          DQ<span>.</span>
        </p>
        <p className="footer-note">
          {"Dominic Quintilian \u00B7 Toronto, ON \u00B7 \u00A9 2025"}
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
