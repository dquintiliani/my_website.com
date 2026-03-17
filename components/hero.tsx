"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero">

      <div className="hero-inner">

        {/* ── Left: text ── */}
        <div className="hero-left">

          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line" />
            <span className="hero-eyebrow-text">Data Platform PM</span>
          </div>

          <h1 className="hero-name">
            Dominic<br />
            Quintili<em>an</em>
          </h1>

          <div className="hero-statement">
            <p className="hero-statement-text">
              Product decisions<br />
              get <strong>messy</strong>.<br />
              That&apos;s where I start.
            </p>
            <p className="hero-subtext">
              The PM who reads the schema before the PRD.
            </p>
          </div>

          <div className="hero-actions">
            <Link href="#contact" className="hero-btn-primary">
              Let&apos;s talk <span className="hero-btn-arrow">→</span>
            </Link>
            <Link href="#about" className="hero-btn-ghost">
              Read more
            </Link>
          </div>

          <div className="hero-status">
            <span className="hero-status-dot" />
            <span className="hero-status-text">
              <strong>Product Manager</strong>
              {" · Open to opportunities in Toronto"}
            </span>
          </div>

        </div>

        {/* ── Right: image ── */}
        <div className="hero-right">
          <div className="hero-image-frame">
            <span className="hero-corner hero-corner--tl" aria-hidden="true" />
            <span className="hero-corner hero-corner--tr" aria-hidden="true" />
            <span className="hero-corner hero-corner--bl" aria-hidden="true" />
            <span className="hero-corner hero-corner--br" aria-hidden="true" />

            <div className="hero-image-fade-wrap">
              <Image
                src="/block_image.jpeg"
                alt="3D Building Blocks Illustration"
                width={600}
                height={600}
                priority
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div className="hero-image-fade-overlay" aria-hidden="true" />
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="hero-stat-card hero-stat-card--1">
            <span className="hero-stat-value">5M+</span>
            <span className="hero-stat-label">Users on systems owned</span>
          </div>
          <div className="hero-stat-card hero-stat-card--2">
            <span className="hero-stat-value">56%</span>
            <span className="hero-stat-label">Latency improvement</span>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="hero-bottom">
        <div className="hero-companies">
          <span className="hero-companies-label">Previously</span>
          {["Ticketmaster", "TheScore", "Lululemon"].map((co) => (
            <span key={co} className="hero-chip">{co}</span>
          ))}
        </div>
        <div className="hero-scroll-hint">
          <div className="hero-scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </div>

    </section>
  );
}