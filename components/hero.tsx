"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const HEATMAP_ROWS = 5;
const HEATMAP_COLS = 8;

// Static, hand-tuned histogram bins purely for a pleasant decorative pattern.
const HISTOGRAM_BINS = [
  { range: "0 – 10", count: 14, x: 42, y: 199, height: 76, color: "a" },
  { range: "10 – 20", count: 26, x: 109, y: 134, height: 141, color: "b" },
  { range: "20 – 30", count: 38, x: 176, y: 68, height: 207, color: "c" },
  { range: "30 – 40", count: 34, x: 243, y: 90, height: 185, color: "d" },
  { range: "40 – 50", count: 22, x: 310, y: 156, height: 120, color: "e" },
  { range: "50 – 60", count: 11, x: 377, y: 215, height: 60, color: "b" },
  { range: "60 – 70", count: 5, x: 445, y: 248, height: 27, color: "a" },
] as const;
const HISTOGRAM_BAR_WIDTH = 67;
const HISTOGRAM_BASELINE = 275;
const HISTOGRAM_X_LABELS = [0, 10, 20, 30, 40, 50, 60, 70];
const HISTOGRAM_Y_GRID = [
  { y: 58, label: "40" },
  { y: 112, label: "30" },
  { y: 166, label: "20" },
  { y: 221, label: "10" },
];

// Static, hand-tuned neural network layout (layer x-position, node y-positions,
// color token) purely for a pleasant decorative pattern: 3 inputs feeding
// three fully-connected hidden layers of 4, collapsing to a single output.
const NN_LAYERS = [
  { x: 60, ys: [40, 160, 280], color: "input" },
  { x: 187, ys: [40, 120, 200, 280], color: "hidden" },
  { x: 314, ys: [40, 120, 200, 280], color: "hidden" },
  { x: 441, ys: [40, 120, 200, 280], color: "hidden" },
  { x: 520, ys: [160], color: "output" },
] as const;
const NN_NODE_RADIUS = 14;
const NN_OUTPUT_STUB_X = 560;

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

function HeroHistogram() {
  return (
    <svg
      viewBox="0 0 560 320"
      className="hero-illustration"
      aria-label="Simple histogram visualization"
    >
      <line x1="42" y1="58" x2="512" y2="58" className="grid-line" />
      <line x1="42" y1="112" x2="512" y2="112" className="grid-line" />
      <line x1="42" y1="166" x2="512" y2="166" className="grid-line" />
      <line x1="42" y1="221" x2="512" y2="221" className="grid-line" />
      {HISTOGRAM_Y_GRID.map(({ y, label }) => (
        <text
          key={label}
          x="36"
          y={y}
          className="hist-axis-label hist-y-axis-label"
        >
          {label}
        </text>
      ))}

      <line
        x1="42"
        y1={HISTOGRAM_BASELINE}
        x2="512"
        y2={HISTOGRAM_BASELINE}
        className="hist-axis"
      />
      <line x1="42" y1="32" x2="42" y2={HISTOGRAM_BASELINE} className="hist-axis" />

      {HISTOGRAM_BINS.map((bin, index) => (
        <Tooltip key={bin.range}>
          <TooltipTrigger asChild>
            <rect
              x={bin.x}
              y={bin.y}
              width={HISTOGRAM_BAR_WIDTH}
              height={bin.height}
              className={`hist-bar hist-color-${bin.color}`}
              style={{ animationDelay: `${0.2 + index * 0.03}s` }}
            />
          </TooltipTrigger>
          <TooltipContent>
            Bin {bin.range}: {bin.count}
          </TooltipContent>
        </Tooltip>
      ))}

      {HISTOGRAM_X_LABELS.map((label, index) => (
        <text
          key={label}
          x={42 + index * HISTOGRAM_BAR_WIDTH}
          y="289"
          className="hist-axis-label"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

function HeroNeuralNet() {
  return (
    <svg
      viewBox="0 0 560 320"
      className="hero-illustration"
      aria-label="Simple neural network visualization"
    >
      {NN_LAYERS.slice(0, -1).flatMap((layer, layerIndex) => {
        const nextLayer = NN_LAYERS[layerIndex + 1];
        const stageDelay = 0.15 + layerIndex * 0.2;
        return layer.ys.flatMap((y1, i) =>
          nextLayer.ys.map((y2, j) => (
            <line
              key={`edge-${layerIndex}-${i}-${j}`}
              x1={layer.x}
              y1={y1}
              x2={nextLayer.x}
              y2={y2}
              className="nn-edge"
              style={{
                animationDelay: `${
                  stageDelay + (i * nextLayer.ys.length + j) * 0.004
                }s`,
              }}
            />
          ))
        );
      })}

      <line
        x1={NN_LAYERS[NN_LAYERS.length - 1].x}
        y1={NN_LAYERS[NN_LAYERS.length - 1].ys[0]}
        x2={NN_OUTPUT_STUB_X}
        y2={NN_LAYERS[NN_LAYERS.length - 1].ys[0]}
        className="nn-edge"
        style={{ animationDelay: "0.95s" }}
      />

      {NN_LAYERS.flatMap((layer, layerIndex) => {
        const stageDelay = 0.05 + layerIndex * 0.2;
        return layer.ys.map((y, i) => (
          <circle
            key={`node-${layerIndex}-${i}`}
            cx={layer.x}
            cy={y}
            r={NN_NODE_RADIUS}
            className={`nn-node nn-color-${layer.color}`}
            style={{ animationDelay: `${stageDelay + i * 0.02}s` }}
          />
        ));
      })}
    </svg>
  );
}

const HERO_ILLUSTRATIONS = [
  "bar-chart",
  "heatmap",
  "histogram",
  "neural-net",
] as const;
type HeroIllustration = (typeof HERO_ILLUSTRATIONS)[number];

export function Hero() {
  const [illustration, setIllustration] =
    useState<HeroIllustration>("bar-chart");

  useEffect(() => {
    const index = Math.floor(Math.random() * HERO_ILLUSTRATIONS.length);
    setIllustration(HERO_ILLUSTRATIONS[index]);
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
            {illustration === "heatmap" ? (
              <HeroHeatmap />
            ) : illustration === "histogram" ? (
              <HeroHistogram />
            ) : illustration === "neural-net" ? (
              <HeroNeuralNet />
            ) : (
              <HeroBarChart />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
