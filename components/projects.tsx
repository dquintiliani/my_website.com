"use client";

import { useState, useEffect, CSSProperties } from "react";
import { getAllTools, Tool } from "@/lib/tools";
import { ScrollFadeIn } from "@/components/scroll-fade-in";

export default function Projects() {
  const tools = getAllTools();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  };

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);

    setTimeout(() => {
      setSelectedTool(null);
      setIsClosing(false);
      document.body.style.overflow = "unset";
    }, 350);
  };

  // Reusable Paper Style Object
  const paperStyle: CSSProperties = {
    backgroundColor: "#faf8f5",
    backgroundImage: `
      radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px),
      linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(240, 235, 225, 0.5) 100%)
    `,
    backgroundSize: "18px 18px, 100% 100%",
  };

  // Modal Dynamic Styles (Inline to guarantee rendering)
  const isModalActive = isVisible && !isClosing;

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    backgroundColor: "rgba(30, 25, 20, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    opacity: isModalActive ? 1 : 0,
    backdropFilter: isModalActive ? "blur(8px)" : "blur(0px)",
    WebkitBackdropFilter: isModalActive ? "blur(8px)" : "blur(0px)",
    pointerEvents: isModalActive ? "auto" : "none",
    transition: "opacity 0.35s ease, backdrop-filter 0.35s ease",
  };

  const modalCardStyle: CSSProperties = {
    ...paperStyle,
    position: "relative",
    zIndex: 10000,
    width: "100%",
    maxWidth: "560px",
    padding: "40px",
    borderRadius: "28px",
    boxSizing: "border-box",
    border: "1px solid rgba(180, 170, 150, 0.5)",
    boxShadow: `
      inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
      0 24px 60px rgba(0, 0, 0, 0.18),
      0 4px 16px rgba(0, 0, 0, 0.08)
    `,
    opacity: isModalActive ? 1 : 0,
    transform: isModalActive ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)",
    transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <section id="projects" style={{ backgroundColor: "#f7f4ed", minHeight: "100vh", padding: "40px 20px" }}>
      <ScrollFadeIn />

      {/* Embedded CSS for Pseudo-classes & Hover states */}
      <style>{`
        .tool-card {
          position: relative;
          border-radius: 20px;
          padding: 28px 24px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(180, 170, 150, 0.35);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.8),
            0 1px 2px rgba(40, 30, 20, 0.04),
            0 4px 12px rgba(40, 30, 20, 0.03),
            0 12px 24px -4px rgba(40, 30, 20, 0.02);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s ease;
        }

        .tool-card:hover {
          transform: translateY(-4px) rotate(-0.2deg);
          border-color: rgba(160, 145, 120, 0.5);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
            0 4px 8px rgba(40, 30, 20, 0.04),
            0 16px 32px -4px rgba(40, 30, 20, 0.08);
        }

        .tool-card:nth-child(odd):hover {
          transform: translateY(-4px) rotate(0.2deg);
        }

        .tool-tag {
          background-color: rgba(238, 234, 227, 0.85);
          backdrop-filter: blur(2px);
          color: #3a3834;
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 12px;
          font-weight: 600;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #eeeae3;
          border: 1px solid rgba(0, 0, 0, 0.08);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: bold;
          color: #42403b;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .close-btn:hover {
          transform: scale(1.08);
          background-color: #e2ddd4;
        }

        .cta-btn {
          display: inline-block;
          background-color: #1a1a18;
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 980px;
          font-weight: 600;
          font-size: 0.92rem;
          text-decoration: none;
          text-align: center;
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .cta-btn:hover {
          transform: translateY(-1px);
          background-color: #2c2b28;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="blog-inner" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div className="blog-header" style={{ marginBottom: "32px" }}>
          <p style={{ color: "#7a7670", fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Projects
          </p>
          <h1 style={{ color: "#1a1a18", fontSize: "2.5rem", fontWeight: 700, margin: "8px 0" }}>
            Solo Builds Using <em style={{ fontFamily: "serif", fontStyle: "italic" }}>AI</em>.
          </h1>
          <p style={{ color: "#66625b", fontSize: "1.05rem", lineHeight: 1.5, maxWidth: "600px" }}>
            Side tools and experiments I&apos;ve shipped by pairing product
            thinking with AI. Each one is live — click in and try each one out!
          </p>
        </div>

        {/* Tool Grid */}
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
              style={paperStyle}
              onClick={() => handleOpen(tool)}
            >
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#a39f97", margin: "0 0 12px 0" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1a1a18", margin: "0 0 10px 0", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: "0.92rem", color: "#66625b", lineHeight: 1.5, margin: "0 0 24px 0" }}>
                  {tool.summary}
                </p>
              </div>

              <div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {tool.tags.map((tag) => (
                    <span key={tag} className="tool-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Paper Modal Overlay */}
      {selectedTool && (
        <div onClick={handleClose} style={overlayStyle}>
          <div onClick={(e) => e.stopPropagation()} style={modalCardStyle}>
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="close-btn"
            >
              ✕
            </button>

            <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#858076", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px 0" }}>
              {selectedTool.status === "live" ? "Live Tool" : "Experiment"}
            </p>

            <h2 style={{ fontSize: "1.85rem", fontWeight: 700, color: "#1a1a18", margin: "0 0 12px 0", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              {selectedTool.title}
            </h2>

            <p style={{ fontSize: "1rem", color: "#66625b", lineHeight: 1.55, margin: "0 0 24px 0" }}>
              {selectedTool.summary}
            </p>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
              {selectedTool.tags.map((tag) => (
                <span key={tag} className="tool-tag">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={selectedTool.href}
              {...(selectedTool.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="cta-btn"
            >
              Open tool &rarr;
            </a>
          </div>
        </div>
      )}
    </section>
  );
}