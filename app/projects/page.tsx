"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { getAllTools, Tool } from "@/lib/tools";
import { ScrollFadeIn } from "@/components/scroll-fade-in";

export default function Projects() {
  const tools = getAllTools();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedTool) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedTool]);

  const handleOpen = (tool: Tool) => {
    setIsClosing(false);
    setSelectedTool(tool);
    document.body.style.overflow = "hidden";

    // Trigger fade-in after element mounts in DOM
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  };

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);

    // Wait for fade-out duration before unmounting
    setTimeout(() => {
      setSelectedTool(null);
      setIsClosing(false);
      document.body.style.overflow = "unset";
    }, 400);
  };

  return (
    <section id="projects" style={{ backgroundColor: "#f7f4ed", minHeight: "100vh", padding: "40px 20px" }}>
      <ScrollFadeIn />
      <div className="blog-inner" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Header ── */}
        <div className="blog-header" style={{ marginBottom: "32px" }}>
          <p className="section-label" style={{ color: "#7a7670", fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Projects
          </p>
          <h1 className="blog-page-title" style={{ color: "#1a1a18", fontSize: "2.5rem", fontWeight: 700, margin: "8px 0" }}>
            Solo Builds <em style={{ fontFamily: "serif", fontStyle: "italic" }}>AI</em>.
          </h1>
          <p className="blog-page-desc" style={{ color: "#66625b", fontSize: "1.05rem", lineHeight: 1.5, maxWidth: "600px" }}>
            Side tools and experiments I&apos;ve shipped by pairing product
            thinking with AI. Each one is live — click in and try each one out!
          </p>
        </div>

        {/* ── CSS Styles Matching Warm Cream Theme ── */}
        <style jsx>{`
          .tool-card {
            position: relative;
            background-color: #ffffff;
            border-radius: 24px;
            padding: 28px 24px;
            border: 1px solid rgba(0, 0, 0, 0.04);
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.3s ease;
            will-change: transform, box-shadow;
          }

          .tool-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
            border-color: rgba(0, 0, 0, 0.08);
          }

          /* Smooth Transition Layer */
          .modal-overlay {
            opacity: 0;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              backdrop-filter 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              -webkit-backdrop-filter 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, backdrop-filter;
          }

          .modal-overlay.visible {
            opacity: 1;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          .modal-card {
            opacity: 0;
            transform: scale(0.97) translateY(10px);
            transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }

          .modal-card.visible {
            opacity: 1;
            transform: scale(1) translateY(0);
          }

          .close-btn {
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.2s ease;
          }
          .close-btn:hover {
            transform: scale(1.06);
            background-color: #e8e4dc;
          }

          .cta-btn {
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.2s ease, box-shadow 0.2s ease;
          }
          .cta-btn:hover {
            transform: translateY(-1px);
            background-color: #2c2b28;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          }
        `}</style>

        {/* ── Tool Grid ── */}
        <div
          style={{
            marginTop: "16px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {tools.map((tool, i) => (
            <div
              key={tool.slug}
              className="tool-card"
              onClick={() => handleOpen(tool)}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#a39f97",
                    margin: "0 0 12px 0",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "#1a1a18",
                    margin: "0 0 10px 0",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tool.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "#66625b",
                    lineHeight: 1.5,
                    margin: "0 0 24px 0",
                  }}
                >
                  {tool.summary}
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: "#f2efe9",
                        color: "#3a3834",
                        fontSize: "0.75rem",
                        padding: "5px 12px",
                        borderRadius: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modal Overlay Matching Warm Design ── */}
      {selectedTool && (
        <div
          onClick={handleClose}
          className={`modal-overlay ${isVisible && !isClosing ? "visible" : ""}`}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(40, 35, 30, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`modal-card ${isVisible && !isClosing ? "visible" : ""}`}
            style={{
              backgroundColor: "#fcfbf8",
              borderRadius: "28px",
              padding: "40px",
              maxWidth: "540px",
              width: "100%",
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.03)",
              border: "1px solid #e8e4dc",
              position: "relative",
              transformOrigin: "center center",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="close-btn"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0ece1",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "#42403b",
              }}
            >
              ✕
            </button>

            <p
              style={{
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#858076",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "0 0 8px 0",
              }}
            >
              {selectedTool.status === "live" ? "Live Tool" : "Experiment"}
            </p>

            <h2
              style={{
                fontSize: "1.85rem",
                fontWeight: 700,
                color: "#1a1a18",
                margin: "0 0 12px 0",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              {selectedTool.title}
            </h2>

            <p
              style={{
                fontSize: "1rem",
                color: "#66625b",
                lineHeight: 1.55,
                margin: "0 0 24px 0",
              }}
            >
              {selectedTool.summary}
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              {selectedTool.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: "#f2efe9",
                    color: "#3a3834",
                    fontSize: "0.78rem",
                    padding: "6px 14px",
                    borderRadius: "16px",
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Modal Action CTA */}
            <a
              href={selectedTool.href}
              {...(selectedTool.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="cta-btn"
              style={{
                display: "inline-block",
                backgroundColor: "#1a1a18",
                color: "#ffffff",
                padding: "12px 26px",
                borderRadius: "980px",
                fontWeight: 600,
                fontSize: "0.92rem",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Open tool &rarr;
            </a>
          </div>
        </div>
      )}
    </section>
  );
}