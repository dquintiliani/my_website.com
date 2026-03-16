"use client";

import { useState } from "react";

const skills = [
  {
    id: "01",
    tag: "Data Platform",
    headline: "Treats the data layer as a product with real users — not plumbing.",
    body: "At Universe (Ticketmaster), owned the checkout transaction data as the organizational source of truth: the system enterprise clients depended on to verify financial accuracy during quarterly settlements. Pipelines, contracts, and data dictionaries weren't internal artifacts — they were the product.",
  },
  {
    id: "02",
    tag: "Analytics",
    headline: "Builds the infrastructure that lets planning teams stop asking engineering for reports.",
    body: "At Lululemon, consolidated fragmented purchase order and supply chain data into a single Anaplan planning system, enabling Global Planning leadership to independently track profit margins and unit profitability — without a ticket or a Slack message.",
  },
  {
    id: "03",
    tag: "Technical",
    headline: "Turns architectural tradeoffs into decisions that have a number attached.",
    body: "At TheScore, partnered with engineering leads to define the API Gateway redesign — then translated that into a business case that secured alignment across non-technical stakeholders. Result: 56% latency improvement and 75% infrastructure cost reduction on a platform serving 5M+ users during Super Bowl traffic.",
  },
  {
    id: "04",
    tag: "Discovery",
    headline: "Finds the gap between what stakeholders ask for and what they actually need to decide.",
    body: "At Lululemon, partnered with business domain experts to surface visualization requirements that weren't in the original spec — translating them into Anaplan module structures that reflected how planners actually thought about margin performance, not how the system was originally modelled.",
  },
  {
    id: "05",
    tag: "Documentation",
    headline: "Defines data contracts and terminology standards that don't require a translator.",
    body: "At Ticketmaster, led the standardization of reporting terminology and data dictionaries across the Universe platform — establishing consistent definitions for orders, chargebacks, and reconciliation that reduced ambiguity across three downstream teams.",
  },
  {
    id: "06",
    tag: "AI / LLM",
    headline: "Actively building with LLMs — not just advising on them.",
    body: "Currently developing a trend-detection tool that indexes Reddit, Hacker News, and arXiv to surface signal from unstructured text at scale. Brings hands-on Python and API integration experience to LLM product decisions — which means the \u201cshould we build this?\u201d conversation starts from a real architecture question, not a feature request.",
  },
];

export default function Skills() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>Capabilities</p>
          <h2 style={styles.title}>
            What I actually <em style={styles.em}>do</em>.
          </h2>
        </div>

        <div>
          {skills.map((skill, i) => {
            const active = hovered === i;
            const isLast = i === skills.length - 1;
            return (
              <div
                key={skill.id}
                style={{
                  ...styles.item,
                  ...(active ? styles.itemActive : {}),
                  borderTop: "1px solid #D2CEC5",
                  ...(isLast ? { borderBottom: "1px solid #D2CEC5" } : {}),
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  style={{
                    ...styles.bar,
                    transform: active ? "scaleY(1)" : "scaleY(0)",
                  }}
                />

                <div style={styles.meta}>
                  <span
                    style={{
                      ...styles.num,
                      color: active ? "#2C5F14" : "#AEADA5",
                    }}
                  >
                    {skill.id}
                  </span>
                  <span
                    style={{
                      ...styles.tag,
                      background: active ? "#2C5F14" : "#DDD9D1",
                      color: active ? "#E8F3DF" : "#7A7670",
                    }}
                  >
                    {skill.tag}
                  </span>
                </div>

                <div style={styles.content}>
                  <p style={styles.headline}>{skill.headline}</p>
                  <p
                    style={{
                      ...styles.body,
                      color: active ? "#3D3B37" : "#6B6760",
                    }}
                  >
                    {skill.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: "#EEEAE3",
    padding: "96px 0",
    fontFamily:
      "'DM Sans', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },
  inner: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "0 40px",
  },
  header: {
    marginBottom: "52px",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: "500",
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color: "#2C5F14",
    margin: "0 0 14px",
  },
  title: {
    fontSize: "clamp(32px, 4vw, 48px)",
    fontWeight: "700",
    color: "#1A1916",
    letterSpacing: "-0.025em",
    lineHeight: "1.1",
    margin: 0,
  },
  em: {
    fontStyle: "italic",
    color: "#2C5F14",
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: "40px",
    padding: "30px 28px",
    position: "relative",
    cursor: "default",
    transition: "background-color 0.18s ease",
    borderRadius: "2px",
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  itemActive: {
    backgroundColor: "#E6E1D8",
  },
  bar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    backgroundColor: "#2C5F14",
    transformOrigin: "top",
    transition: "transform 0.22s ease",
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px",
    minWidth: "90px",
    paddingTop: "2px",
    flexShrink: 0,
  },
  num: {
    fontSize: "13px",
    fontWeight: "500",
    letterSpacing: "0.05em",
    transition: "color 0.18s ease",
    fontVariantNumeric: "tabular-nums",
  },
  tag: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "0.09em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: "2px",
    transition: "background-color 0.18s ease, color 0.18s ease",
    whiteSpace: "nowrap",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "9px",
    minWidth: 0,
  },
  headline: {
    fontSize: "clamp(14px, 1.4vw, 16px)",
    fontWeight: "600",
    color: "#1A1916",
    lineHeight: "1.45",
    letterSpacing: "-0.01em",
    margin: 0,
  },
  body: {
    fontSize: "13.5px",
    fontWeight: "400",
    lineHeight: "1.75",
    margin: 0,
    maxWidth: "640px",
    transition: "color 0.18s ease",
  },
};

export { Skills };
