"use client";

import { useState, useEffect } from "react";
import { getAllTools, Tool } from "@/lib/tools";
import { ScrollFadeIn } from "@/components/scroll-fade-in";
import { CtaButton, CloseButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

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

  const isModalActive = isVisible && !isClosing;

  return (
    <section
      id="projects"
      className="min-h-screen bg-[#f7f4ed] px-5 py-10"
    >
      <ScrollFadeIn />
      <div className="blog-inner mx-auto max-w-[1100px]">
        {/* ── Header ── */}
        <div className="blog-header mb-8">
          <p className="section-label text-[0.9rem] font-semibold uppercase tracking-[0.05em] text-[#7a7670]">
            Projects
          </p>
          <h1 className="blog-page-title my-2 text-[2.5rem] font-bold text-[#1a1a18]">
            Solo Builds <em className="font-serif italic">AI</em>.
          </h1>
          <p className="blog-page-desc max-w-[600px] text-[1.05rem] leading-[1.5] text-[#66625b]">
            Side tools and experiments I&apos;ve shipped by pairing product
            thinking with AI. Each one is live — click in and try each one out!
          </p>
        </div>

        {/* ── Tool Grid ── */}
        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {tools.map((tool, i) => (
            <div
              key={tool.slug}
              onClick={() => handleOpen(tool)}
              className="relative flex cursor-pointer flex-col justify-between rounded-3xl border border-black/[0.04] bg-white p-7 px-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] [transition:transform_0.4s_cubic-bezier(0.16,1,0.3,1),box-shadow_0.4s_cubic-bezier(0.16,1,0.3,1),border-color_0.3s_ease] [will-change:transform,box-shadow] hover:-translate-y-[3px] hover:border-black/[0.08] hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
            >
              <div>
                <p className="mb-3 text-[0.85rem] font-semibold text-[#a39f97]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2.5 text-[1.35rem] font-bold leading-[1.25] tracking-[-0.01em] text-[#1a1a18]">
                  {tool.title}
                </h3>
                <p className="mb-6 text-[0.92rem] leading-[1.5] text-[#66625b]">
                  {tool.summary}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[14px] bg-[#f2efe9] px-3 py-1.5 text-xs font-semibold text-[#3a3834]"
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
          className={cn(
            "fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(40,35,30,0.25)] p-5 [transition:opacity_0.45s_cubic-bezier(0.16,1,0.3,1),backdrop-filter_0.45s_cubic-bezier(0.16,1,0.3,1)] [will-change:opacity,backdrop-filter]",
            isModalActive ? "opacity-100 backdrop-blur-[10px]" : "opacity-0 backdrop-blur-none",
          )}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full max-w-[540px] origin-center rounded-[28px] border border-[#e8e4dc] bg-[#fcfbf8] p-10 shadow-[0_24px_60px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.03)] [transition:opacity_0.45s_cubic-bezier(0.16,1,0.3,1),transform_0.45s_cubic-bezier(0.16,1,0.3,1)] [will-change:opacity,transform]",
              isModalActive ? "translate-y-0 scale-100 opacity-100" : "translate-y-[10px] scale-[0.97] opacity-0",
            )}
          >
            {/* Close Button */}
            <CloseButton onClick={handleClose} />

            <p className="mb-2 text-[0.82rem] font-semibold uppercase tracking-[0.06em] text-[#858076]">
              {selectedTool.status === "live" ? "Live Tool" : "Experiment"}
            </p>

            <h2 className="mb-3 text-[1.85rem] font-bold leading-[1.2] tracking-[-0.01em] text-[#1a1a18]">
              {selectedTool.title}
            </h2>

            <p className="mb-6 text-base leading-[1.55] text-[#66625b]">
              {selectedTool.summary}
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {selectedTool.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-2xl bg-[#f2efe9] px-3.5 py-1.5 text-[0.78rem] font-semibold text-[#3a3834]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Modal Action CTA */}
            <CtaButton
              href={selectedTool.href}
              {...(selectedTool.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              Open tool &rarr;
            </CtaButton>
          </div>
        </div>
      )}
    </section>
  );
}
