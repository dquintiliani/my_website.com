"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section id="hero">
      <div className="hero-inner">
        <div className="hero">
          <span className="hero-signature">Dominic Quintilian</span>
          <h1 className="hero-name">Data is fuel for AI</h1>

          <p className="hero-copy">
            I've spent the past 5 years helping businesses optimize their data
            for AI, and better decision making.
          </p>
          <Link href="#about" className="hero-cta">
            Learn more about how I can help your company
            <span className="hero-status-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-frame">
            <div className="hero-image-glow" />
            <svg
              viewBox="0 0 560 320"
              className="hero-illustration"
              aria-label="Simple bar chart visualization"
            >
              <defs>
                <linearGradient id="heroCardBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f8f4ea" />
                </linearGradient>
              </defs>


              <line x1="56" y1="94" x2="504" y2="94" className="grid-line" />
              <line x1="56" y1="156" x2="504" y2="156" className="grid-line" />
              <line x1="56" y1="218" x2="504" y2="218" className="grid-line" />

              <rect x="96" y="132" width="46" height="108" className="data-bar bar-1" />

             

              <rect x="176" y="108" width="46" height="132"  className="data-bar bar-2" />


              <rect x="256" y="94" width="46" height="146" className="data-bar bar-3" />
          

              <rect x="336" y="80" width="46" height="160"  className="data-bar bar-4" />
    

              <rect x="416" y="154" width="46" height="86"  className="data-bar bar-5" />

              <path
                d="M119 132 C155 132 185 116 199 108 S257 94 279 94 S339 80 359 80 S421 154 437 154"
                className="line-series"
                fill="none"
              />
            </svg>

            
          </div>
          <div className="hero-overlay-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
                <defs>
                  <linearGradient id="sageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4E705A" />
                    <stop offset="50%" stopColor="#3F5E4B" />
                    <stop offset="100%" stopColor="#334E3D" />
                  </linearGradient>

                  <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#3F5E4B" floodOpacity="0.2" />
                  </filter>
                </defs>

                <rect width="100%" height="100%" rx="32" fill="#FAF8F5" />
                <rect width="100%" height="100%" rx="32" fill="#FAF8F5" />


                <g filter="url(#softGlow)" fill="none" stroke="url(#sageGradient)" strokeLinecap="round" strokeLinejoin="round">

                  <g strokeWidth="14">
                    <path d="M 235 100 C 180 85, 110 120, 110 180 C 85 210, 85 270, 110 300 C 100 350, 140 400, 190 400 C 220 400, 235 385, 235 360" />
                    <path d="M 235 100 L 235 360" />
                  </g>
                  <g strokeWidth="10" opacity="0.85">
                    <path d="M 175 160 C 190 180, 210 180, 220 160" />
                    <path d="M 160 250 C 185 230, 205 270, 225 250" />
                    <path d="M 175 340 C 195 320, 215 340, 225 320" />
                  </g>
                  <g strokeWidth="12">
                    <path d="M 265 140 L 285 140 L 305 100" />
                    <path d="M 265 200 L 315 200 L 345 160" />
                    <path d="M 265 300 L 315 300 L 350 350" />
                    <path d="M 265 360 L 285 360 L 305 400" />
                  </g>
                  <g strokeWidth="10">
                    <circle cx="165" cy="250" r="16" fill="#FAF8F5" strokeWidth="12" />
                    <path d="M 181 250 L 355 250" strokeDasharray="2 16" strokeLinecap="round" strokeWidth="12" />
                    <circle cx="370" cy="250" r="18" fill="#FAF8F5" strokeWidth="12" />
                  </g>
                  <g strokeWidth="10" fill="#FAF8F5">
                    <circle cx="315" cy="85" r="14" />
                    <circle cx="355" cy="145" r="14" />
                    <circle cx="362" cy="362" r="14" />
                    <circle cx="315" cy="415" r="14" />
                  </g>
                </g>
              </svg>
            </div>
        </div>
      </div>
    </section>
  );
}