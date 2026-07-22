"use client";

import { useState, useEffect } from "react";
import { getAllTools, Tool } from "@/lib/tools";
import { ScrollFadeIn } from "@/components/scroll-fade-in";
import { CtaButton, CloseButton } from "@/components/ui/cta-button";
import { PaperTag } from "@/components/ui/paper-tag";
import { paperCardVariants, paperModalCardVariants } from "@/components/ui/paper-card";
import { cn } from "@/lib/utils";

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

  const isModalActive = isVisible && !isClosing;

  return (
    <section
      id="projects"
      className="min-h-screen bg-[#f7f4ed] px-5 py-10"
    >
      <ScrollFadeIn />

      <div
        className="blog-inner mx-auto max-w-[1100px]"
      >
        {/* Header */}
        <div className="blog-header mb-8">
          <p className="text-[0.9rem] font-semibold uppercase tracking-[0.05em] text-[#7a7670]">
            Projects
          </p>
          <h1 className="my-2 text-[2.5rem] font-bold text-[#1a1a18]">
            Solo Builds Using <em className="font-serif italic">AI</em>.
          </h1>
          <p className="max-w-[600px] text-[1.05rem] leading-[1.5] text-[#66625b]">
            Side tools and experiments I&apos;ve shipped by pairing product
            thinking with AI. Each one is live — click in and try each one out!
          </p>
        </div>

        {/* Tool Grid */}
        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {tools.map((tool, i) => (
            <div
              key={tool.slug}
              onClick={() => handleOpen(tool)}
              className={cn(
                paperCardVariants({ tint: "warm", rotate: i % 2 === 0 ? "left" : "right" }),
                "flex cursor-pointer flex-col justify-between",
              )}
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
                    <PaperTag key={tag}>{tag}</PaperTag>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Paper Modal Overlay */}
      {selectedTool && (
        <div
          onClick={handleClose}
          className={cn(
            "fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(30,25,20,0.45)] p-5 [transition:opacity_0.35s_ease,backdrop-filter_0.35s_ease]",
            isModalActive
              ? "pointer-events-auto opacity-100 backdrop-blur-md"
              : "pointer-events-none opacity-0 backdrop-blur-none",
          )}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={paperModalCardVariants({ active: isModalActive })}
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
                <PaperTag key={tag}>{tag}</PaperTag>
              ))}
            </div>

            <CtaButton
              href={selectedTool.href}
              {...(selectedTool.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Open tool &rarr;
            </CtaButton>
          </div>
        </div>
      )}
    </section>
  );
}
