"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from 'next/image'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const navLinksRef = useRef<HTMLUListElement>(null)

  const handleNavClick = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "/blog", label: "Writing" },
  ]

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          <img
            src="/web-app-manifest-512x512.png"
            alt="DQ."
            style={{ width: 'clamp(48px, 7vw, 72px)', height: 'auto' }}
          />
        </a>
        <ul
          ref={navLinksRef}
          className={`nav-links${isOpen ? " open" : ""}`}
          id="navLinks"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                style={
                  activeSection === link.href.slice(1)
                    ? { color: "var(--green)" }
                    : undefined
                }
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" onClick={handleNavClick}>
              Contact
            </a>
          </li>
        </ul>
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
