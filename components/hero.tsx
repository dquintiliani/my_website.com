"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const HEATMAP_ROWS = 5;
const HEATMAP_COLS = 8;

// Static, hand-tuned intensity levels (1-6) purely for a pleasant decorative pattern.
const HEATMAP_INTENSITIES = [
  [1, 2, 3, 4, 5, 4, 3, 2],
  [2, 3, 4, 5, 6, 5, 3, 2],
  [1, 2, 4, 5, 6, 4, 2, 1],
  [2, 3, 4, 6, 5, 4, 2, 1],
  [1, 1, 2, 3, 4, 3, 2, 1],
];

function HeroBarChart() {
  return (
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
      <rect x="176" y="108" width="46" height="132" className="data-bar bar-2" />
      <rect x="256" y="94" width="46" height="146" className="data-bar bar-3" />
      <rect x="336" y="80" width="46" height="160" className="data-bar bar-4" />
      <rect x="416" y="154" width="46" height="86" className="data-bar bar-5" />

      <path
        d="M119 132 C155 132 185 116 199 108 S257 94 279 94 S339 80 359 80 S421 154 437 154"
        className="line-series"
        fill="none"
      />
    </svg>
  );
}

function HeroHeatmap() {
  const gridX = 56;
  const gridY = 40;
  const gridWidth = 448;
  const gridHeight = 220;
  const cellWidth = gridWidth / HEATMAP_COLS;
  const cellHeight = gridHeight / HEATMAP_ROWS;
  const tickLength = 6;

  return (
    <svg
      viewBox="0 0 560 320"
      className="hero-illustration"
      aria-label="Simple heatmap visualization"
    >
      <line
        x1={gridX}
        y1={gridY + gridHeight}
        x2={gridX + gridWidth}
        y2={gridY + gridHeight}
        className="heatmap-axis"
      />
      <line
        x1={gridX}
        y1={gridY}
        x2={gridX}
        y2={gridY + gridHeight}
        className="heatmap-axis"
      />

      {Array.from({ length: HEATMAP_COLS + 1 }, (_, i) => {
        const x = gridX + i * cellWidth;
        return (
          <line
            key={`x-tick-${i}`}
            x1={x}
            y1={gridY + gridHeight}
            x2={x}
            y2={gridY + gridHeight + tickLength}
            className="heatmap-tick"
          />
        );
      })}

      {Array.from({ length: HEATMAP_ROWS + 1 }, (_, i) => {
        const y = gridY + i * cellHeight;
        return (
          <line
            key={`y-tick-${i}`}
            x1={gridX - tickLength}
            y1={y}
            x2={gridX}
            y2={y}
            className="heatmap-tick"
          />
        );
      })}

      {HEATMAP_INTENSITIES.flatMap((row, rowIdx) =>
        row.map((level, colIdx) => {
          const index = rowIdx * HEATMAP_COLS + colIdx;
          return (
            <rect
              key={`${rowIdx}-${colIdx}`}
              x={gridX + colIdx * cellWidth}
              y={gridY + rowIdx * cellHeight}
              width={cellWidth}
              height={cellHeight}
              className={`heatmap-cell heat-${level}`}
              style={{ animationDelay: `${0.2 + index * 0.015}s` }}
            />
          );
        })
      )}
    </svg>
  );
}

export function Hero() {
  const [illustration, setIllustration] = useState<"bar-chart" | "heatmap">(
    "bar-chart"
  );

  useEffect(() => {
    setIllustration(Math.random() < 0.2 ? "heatmap" : "bar-chart");
  }, []);

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
          <Link href="#contact" className="hero-cta">
            Learn more about how I can help your company
            <span className="hero-status-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-frame">
            {illustration === "heatmap" ? <HeroHeatmap /> : <HeroBarChart />}
          </div>
        </div>
      </div>
    </section>
  );
}
