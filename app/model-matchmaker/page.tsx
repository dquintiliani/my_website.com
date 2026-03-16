"use client"
import { useState, useEffect } from "react";

const QUESTIONS = [
  {
    id: "goal",
    emoji: "💘",
    question: "What are you really looking for?",
    subtext: "Be honest. We don't judge. (We totally judge.)",
    options: [
      { label: "A general ride-or-die assistant", tags: ["goal:general", "goal:agent"] },
      { label: "A deep thinker for writing & strategy", tags: ["goal:writing", "quality:premium"] },
      { label: "A coding soulmate", tags: ["goal:code"] },
      { label: "A chatbot over my own data", tags: ["goal:rag", "goal:chat"] },
      { label: "A multilingual global communicator", tags: ["goal:multilingual"] },
      { label: "Something tiny, fast, and cheap", tags: ["goal:edge", "cost:low"] },
    ],
  },
  {
    id: "platform",
    emoji: "🏠",
    question: "Where do you want to take them home?",
    subtext: "Your place, their place, or the cloud?",
    options: [
      { label: "Google's house (Docs, Gmail, Sheets…)", tags: ["platform:google"] },
      { label: "AWS/Bedrock — it's complicated", tags: ["platform:aws"] },
      { label: "X/Twitter — I live online", tags: ["platform:x"] },
      { label: "My own server (I'm a control freak)", tags: ["deploy:onprem", "deploy:selfhost"] },
      { label: "User's device — offline & private", tags: ["deploy:edge", "privacy:high"] },
      { label: "Wherever, I just want a managed API", tags: ["deploy:saas"] },
    ],
  },
  {
    id: "modality",
    emoji: "👀",
    question: "What are you into?",
    subtext: "What kind of input gets you going?",
    options: [
      { label: "Text only — words are enough", tags: ["input:text"] },
      { label: "Text + images / screenshots / PDFs", tags: ["input:text", "input:vision"] },
      { label: "Text + live tools and APIs", tags: ["input:text", "input:tools"] },
      { label: "Social streams and live feed data", tags: ["input:social", "platform:x"] },
    ],
  },
  {
    id: "output",
    emoji: "✨",
    question: "What makes you feel seen?",
    subtext: "The output that makes your heart sing.",
    options: [
      { label: "Deep reasoning & chain-of-thought", tags: ["output:reasoning", "quality:premium"] },
      { label: "Polished, enterprise-grade writing", tags: ["output:writing", "safety:high"] },
      { label: "Impeccable code & debugging", tags: ["output:code"] },
      { label: "Quick, witty conversational replies", tags: ["output:chat", "cost:low"] },
      { label: "Non-English responses for global reach", tags: ["output:multilingual"] },
    ],
  },
  {
    id: "scale",
    emoji: "📊",
    question: "How many requests a day are we talking?",
    subtext: "We need to know if you're high maintenance.",
    options: [
      { label: "Just a prototype, chill vibes (<10k/day)", tags: ["scale:low"] },
      { label: "Medium — growing fast (10k–1M/day)", tags: ["scale:medium"] },
      { label: "We go hard. 1M+ requests daily.", tags: ["scale:high", "cost:sensitive"] },
      { label: "Batch runs, mostly offline", tags: ["scale:batch"] },
    ],
  },
  {
    id: "cost",
    emoji: "💸",
    question: "Are you a sugar daddy or on a budget?",
    subtext: "No shame. We'll find your match either way.",
    options: [
      { label: "Money is no object — only the best", tags: ["cost:premium"] },
      { label: "A tasteful cost/quality balance", tags: ["cost:balanced"] },
      { label: "Extremely cost-sensitive, frugal energy", tags: ["cost:low", "cost:sensitive"] },
    ],
  },
  {
    id: "privacy",
    emoji: "🔒",
    question: "How private are you?",
    subtext: "Do you trust the cloud with your secrets?",
    options: [
      { label: "Public data, no biggie", tags: ["privacy:low"] },
      { label: "Internal stuff, not super regulated", tags: ["privacy:medium"] },
      { label: "Regulated — HIPAA, GDPR, financial", tags: ["privacy:high", "compliance:strict"] },
      { label: "Air-gapped or VPC-only, no exceptions", tags: ["privacy:high", "deploy:onprem"] },
    ],
  },
  {
    id: "control",
    emoji: "🎛️",
    question: "How do you feel about commitment?",
    subtext: "Customization levels, babe.",
    options: [
      { label: "Totally hands-off, managed API for me", tags: ["control:low", "deploy:saas"] },
      { label: "Some tuning — RAG, system prompts", tags: ["control:medium"] },
      { label: "Full control — self-host & fine-tune", tags: ["control:high", "deploy:selfhost"] },
      { label: "On-device, inside my own app", tags: ["control:high", "deploy:edge"] },
    ],
  },
];

const MODELS = [
  {
    id: "gpt5",
    name: "GPT-5.x",
    maker: "OpenAI",
    emoji: "🧠",
    tagline: "The overachiever who's great at everything and knows it.",
    vibe: "Your reliable, impressive date who actually delivers",
    color: "#10B981",
    tags: ["goal:general", "goal:agent", "goal:code", "output:reasoning", "output:code", "deploy:saas", "scale:low", "scale:medium", "cost:premium", "input:tools", "input:vision"],
  },
  {
    id: "claude4",
    name: "Claude 4.x",
    maker: "Anthropic",
    emoji: "📝",
    tagline: "Writes like a dream. Never embarrasses you at the enterprise dinner.",
    vibe: "Safe, smart, eloquent — the dependable long-term match",
    color: "#F97316",
    tags: ["goal:writing", "output:writing", "output:reasoning", "safety:high", "privacy:high", "compliance:strict", "quality:premium", "goal:rag", "deploy:saas", "input:vision"],
  },
  {
    id: "gemini3",
    name: "Gemini 3.x",
    maker: "Google",
    emoji: "🔍",
    tagline: "Already in your Google Calendar. Knows your schedule better than you.",
    vibe: "The Google-native who makes workspace life effortless",
    color: "#3B82F6",
    tags: ["platform:google", "input:vision", "output:writing", "output:chat", "goal:general", "deploy:saas", "scale:low", "scale:medium"],
  },
  {
    id: "llama",
    name: "Llama (latest)",
    maker: "Meta",
    emoji: "🦙",
    tagline: "Open-source, customizable, and doesn't track your every move.",
    vibe: "The independent free spirit who thrives on your own infrastructure",
    color: "#8B5CF6",
    tags: ["deploy:selfhost", "deploy:onprem", "control:high", "cost:balanced", "goal:rag", "goal:code", "privacy:high", "scale:medium", "scale:high"],
  },
  {
    id: "deepseek",
    name: "DeepSeek R1/V3",
    maker: "DeepSeek",
    emoji: "🔬",
    tagline: "Heavy reasoning at startling prices. The sleeper hit of 2025.",
    vibe: "High IQ, low ego, surprisingly affordable",
    color: "#EF4444",
    tags: ["output:reasoning", "cost:low", "cost:sensitive", "cost:balanced", "goal:agent", "goal:code", "scale:high", "scale:medium", "input:tools"],
  },
  {
    id: "qwen",
    name: "Qwen 3/3.5",
    maker: "Alibaba",
    emoji: "🌏",
    tagline: "Speaks 30+ languages fluently and doesn't ghost non-English markets.",
    vibe: "The worldly, multilingual one with serious enterprise energy",
    color: "#F59E0B",
    tags: ["goal:multilingual", "output:multilingual", "privacy:medium", "privacy:high", "deploy:selfhost", "deploy:onprem", "scale:medium", "scale:high", "cost:balanced"],
  },
  {
    id: "mistral",
    name: "Mistral",
    maker: "Mistral AI",
    emoji: "🇫🇷",
    tagline: "European, efficient, will absolutely keep your data in the EU.",
    vibe: "Sophisticated, principled, on-prem friendly",
    color: "#06B6D4",
    tags: ["deploy:onprem", "deploy:selfhost", "privacy:high", "compliance:strict", "cost:balanced", "cost:low", "scale:medium", "scale:high", "goal:code", "output:code"],
  },
  {
    id: "gemma",
    name: "Gemma 2.x",
    maker: "Google",
    emoji: "🌱",
    tagline: "Small, private, runs offline. Perfect for the introverted developer.",
    vibe: "Tiny but mighty — the local-first privacy darling",
    color: "#84CC16",
    tags: ["deploy:edge", "privacy:high", "goal:edge", "control:high", "cost:low", "scale:low"],
  },
  {
    id: "phi",
    name: "Phi (latest)",
    maker: "Microsoft",
    emoji: "⚡",
    tagline: "Stupidly small, surprisingly smart. Fits on your phone.",
    vibe: "The compact efficiency queen — runs anywhere",
    color: "#A855F7",
    tags: ["deploy:edge", "goal:edge", "cost:low", "cost:sensitive", "output:chat", "scale:low", "scale:medium", "control:high"],
  },
  {
    id: "nova",
    name: "Nova (Amazon)",
    maker: "Amazon",
    emoji: "☁️",
    tagline: "Deeply AWS-native. Basically already married to your S3 bucket.",
    vibe: "The AWS power couple — Bedrock-native and integrated",
    color: "#FF9900",
    tags: ["platform:aws", "deploy:saas", "output:chat", "scale:medium", "scale:high", "goal:rag"],
  },
  {
    id: "grok",
    name: "Grok (xAI)",
    maker: "xAI",
    emoji: "𝕏",
    tagline: "Chronically online. Knows what's trending before you do.",
    vibe: "Real-time, irreverent, and lives on Twitter",
    color: "#1A1A1A",
    tags: ["platform:x", "input:social", "output:chat", "goal:general", "deploy:saas"],
  },
];

function scoreModels(userTags) {
  return MODELS.map((model) => {
    let score = 0;
    const matched = [];
    for (const tag of userTags) {
      if (model.tags.includes(tag)) {
        score += 1;
        matched.push(tag);
      }
    }
    // Hard locks
    if (userTags.includes("platform:google") && model.id === "gemini3") score += 5;
    if (userTags.includes("platform:aws") && model.id === "nova") score += 5;
    if ((userTags.includes("platform:x") || userTags.includes("input:social")) && model.id === "grok") score += 5;
    if (userTags.includes("deploy:edge") && ["gemma", "phi"].includes(model.id)) score += 3;
    if (userTags.includes("compliance:strict") && ["claude4", "mistral"].includes(model.id)) score += 3;
    if (userTags.includes("cost:sensitive") && ["deepseek", "phi", "gemma"].includes(model.id)) score += 3;
    if (userTags.includes("goal:multilingual") && model.id === "qwen") score += 4;
    return { ...model, score, matched };
  }).sort((a, b) => b.score - a.score);
}

export default function ModelMatchmaker() {
  const [screen, setScreen] = useState("intro"); // intro | quiz | results
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState({});
  const [allTags, setAllTags] = useState([]);
  const [results, setResults] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  const totalQ = QUESTIONS.length;
  const q = QUESTIONS[currentQ];

  const handleSelect = (optionIndex) => {
    const key = q.id;
    const prev = selected[key];
    const newSelected = { ...selected };

    if (prev === optionIndex) {
      delete newSelected[key];
    } else {
      newSelected[key] = optionIndex;
    }
    setSelected(newSelected);
  };

  const handleNext = () => {
    if (selected[q.id] === undefined) return;
    setAnimating(true);
    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        setCurrentQ((p) => p + 1);
      } else {
        const tags = [];
        QUESTIONS.forEach((question) => {
          const idx = selected[question.id];
          if (idx !== undefined) {
            tags.push(...question.options[idx].tags);
          }
        });
        setAllTags(tags);
        setResults(scoreModels(tags));
        setScreen("results");
      }
      setAnimating(false);
    }, 220);
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setAnimating(true);
      setTimeout(() => { setCurrentQ((p) => p - 1); setAnimating(false); }, 180);
    }
  };

  const handleReset = () => {
    setScreen("intro");
    setCurrentQ(0);
    setSelected({});
    setAllTags([]);
    setResults([]);
    setHeartCount(0);
  };

  const progress = ((currentQ) / totalQ) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f0f 0%, #1a0a1a 40%, #0a0a1f 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient floating blobs */}
      <div style={{
        position: "fixed", top: "-20%", left: "-10%", width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(255,20,147,0.12) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none", animation: "float1 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "fixed", bottom: "-20%", right: "-10%", width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(138,43,226,0.1) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none", animation: "float2 10s ease-in-out infinite",
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,30px)} }
        @keyframes heartPop { 0%{transform:scale(1)} 50%{transform:scale(1.4)} 100%{transform:scale(1)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        .option-btn { transition: all 0.18s ease; cursor: pointer; }
        .option-btn:hover { transform: translateY(-2px); }
        .option-btn.selected { transform: translateY(-1px); }
        .next-btn { transition: all 0.15s ease; }
        .next-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,20,147,0.5) !important; }
        .next-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .model-card { transition: all 0.2s ease; }
        .model-card:hover { transform: translateY(-4px); }
      `}</style>

      {screen === "intro" && <IntroScreen onStart={() => setScreen("quiz")} />}
      {screen === "quiz" && (
        <QuizScreen
          q={q}
          currentQ={currentQ}
          totalQ={totalQ}
          progress={progress}
          selected={selected}
          animating={animating}
          onSelect={handleSelect}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {screen === "results" && (
        <ResultsScreen results={results} allTags={allTags} onReset={handleReset} />
      )}
    </div>
  );
}

function IntroScreen({ onStart }) {
  return (
    <div style={{ textAlign: "center", maxWidth: "560px", animation: "fadeIn 0.6s ease" }}>
      <div style={{ fontSize: "72px", marginBottom: "16px", lineHeight: 1 }}>💘</div>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(42px, 8vw, 64px)",
        fontWeight: 900,
        fontStyle: "italic",
        margin: "0 0 8px",
        background: "linear-gradient(135deg, #ff1493, #ff69b4, #da70d6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        lineHeight: 1.1,
      }}>
        Model<br />Matchmaker
      </h1>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "13px",
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.4)",
        marginBottom: "32px",
      }}>Find your perfect LLM soulmate</p>

      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "28px 32px",
        marginBottom: "36px",
        backdropFilter: "blur(10px)",
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "16px",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.75)",
          margin: 0,
        }}>
          Swipe right on reasoning? Hate latency?<br />
          Can't deal with an LLM that talks to your competitors?<br /><br />
          <span style={{ color: "#ff69b4", fontStyle: "italic" }}>
            8 questions. 11 potential matches. Zero ghosting.
          </span>
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "36px", flexWrap: "wrap" }}>
        {["GPT-5.x", "Claude 4", "Mistral", "Grok", "+7 more"].map((m, i) => (
          <span key={i} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
            padding: "4px 12px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
          }}>{m}</span>
        ))}
      </div>

      <button onClick={onStart} className="next-btn" style={{
        background: "linear-gradient(135deg, #ff1493, #da70d6)",
        border: "none",
        borderRadius: "50px",
        padding: "18px 52px",
        fontSize: "18px",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        fontStyle: "italic",
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0 4px 24px rgba(255,20,147,0.35)",
      }}>
        Find My Match 💕
      </button>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        color: "rgba(255,255,255,0.2)",
        marginTop: "20px",
      }}>No commitment required. Results not legally binding.</p>
    </div>
  );
}

function QuizScreen({ q, currentQ, totalQ, progress, selected, animating, onSelect, onNext, onBack }) {
  const isSelected = selected[q.id] !== undefined;

  return (
    <div style={{
      width: "100%",
      maxWidth: "620px",
      animation: animating ? "none" : "slideIn 0.3s ease",
      opacity: animating ? 0 : 1,
      transition: "opacity 0.2s",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
        <button onClick={onBack} disabled={currentQ === 0} style={{
          background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%",
          width: "36px", height: "36px", color: "rgba(255,255,255,0.4)",
          cursor: currentQ === 0 ? "not-allowed" : "pointer",
          fontFamily: "'DM Sans', sans-serif", fontSize: "16px",
          transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center",
        }}>←</button>

        <div style={{ flex: 1, margin: "0 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px", textTransform: "uppercase" }}>
              Question {currentQ + 1} of {totalQ}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#ff69b4" }}>
              {"💕".repeat(Math.ceil(((currentQ + 1) / totalQ) * 5))}
            </span>
          </div>
          <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
            <div style={{
              height: "100%",
              width: `${progress + (100 / totalQ)}%`,
              background: "linear-gradient(90deg, #ff1493, #da70d6)",
              borderRadius: "2px",
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
          color: "rgba(255,255,255,0.25)", letterSpacing: "1px",
        }}></div>
      </div>

      {/* Question card */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px",
        padding: "36px",
        marginBottom: "20px",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ fontSize: "42px", marginBottom: "16px" }}>{q.emoji}</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(22px, 4vw, 30px)",
          fontWeight: 700,
          fontStyle: "italic",
          margin: "0 0 8px",
          color: "#fff",
          lineHeight: 1.3,
        }}>{q.question}</h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13px",
          color: "rgba(255,255,255,0.35)",
          margin: "0 0 28px",
          fontStyle: "italic",
        }}>{q.subtext}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {q.options.map((opt, i) => {
            const isSel = selected[q.id] === i;
            return (
              <button
                key={i}
                className={`option-btn${isSel ? " selected" : ""}`}
                onClick={() => onSelect(i)}
                style={{
                  background: isSel
                    ? "linear-gradient(135deg, rgba(255,20,147,0.2), rgba(218,112,214,0.15))"
                    : "rgba(255,255,255,0.04)",
                  border: isSel
                    ? "1px solid rgba(255,105,180,0.6)"
                    : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  padding: "14px 20px",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: isSel ? "#fff" : "rgba(255,255,255,0.65)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: isSel ? "500" : "400",
                  boxShadow: isSel ? "0 0 20px rgba(255,20,147,0.15)" : "none",
                }}
              >
                <span style={{
                  width: "22px", height: "22px",
                  borderRadius: "50%",
                  border: isSel ? "2px solid #ff69b4" : "2px solid rgba(255,255,255,0.15)",
                  background: isSel ? "#ff69b4" : "transparent",
                  flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "10px",
                  transition: "all 0.15s",
                }}>
                  {isSel ? "✓" : ""}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        className="next-btn"
        onClick={onNext}
        disabled={!isSelected}
        style={{
          width: "100%",
          background: isSelected
            ? "linear-gradient(135deg, #ff1493, #da70d6)"
            : "rgba(255,255,255,0.05)",
          border: "none",
          borderRadius: "50px",
          padding: "16px",
          fontSize: "16px",
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 700,
          color: isSelected ? "#fff" : "rgba(255,255,255,0.2)",
          boxShadow: isSelected ? "0 4px 20px rgba(255,20,147,0.3)" : "none",
          cursor: isSelected ? "pointer" : "not-allowed",
          transition: "all 0.2s",
        }}
      >
        {currentQ === QUESTIONS.length - 1 ? "Find My Match 💘" : "Next →"}
      </button>
    </div>
  );
}

function ResultsScreen({ results, allTags, onReset }) {
  const [expanded, setExpanded] = useState(null);
  const top3 = results.slice(0, 3);
  const rest = results.slice(3);

  return (
    <div style={{ width: "100%", maxWidth: "660px", animation: "slideIn 0.5s ease" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "56px", marginBottom: "12px" }}>💝</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(32px, 6vw, 48px)",
          fontWeight: 900,
          fontStyle: "italic",
          margin: "0 0 10px",
          background: "linear-gradient(135deg, #ff1493, #ff69b4, #da70d6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>Your Matches Are In</h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          color: "rgba(255,255,255,0.4)",
          fontStyle: "italic",
        }}>We analyzed your vibe. Here's who's compatible.</p>
      </div>

      {/* Top match */}
      <TopMatchCard model={top3[0]} rank={1} />

      {/* Runners up */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
        {top3.slice(1).map((m, i) => (
          <RunnerUpCard key={m.id} model={m} rank={i + 2} />
        ))}
      </div>

      {/* Compatibility tags */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "20px 24px",
        marginBottom: "20px",
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          margin: "0 0 12px",
        }}>Your compatibility signals</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {allTags.map((t, i) => (
            <span key={i} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              padding: "4px 10px",
              borderRadius: "20px",
              background: "rgba(255,20,147,0.1)",
              border: "1px solid rgba(255,20,147,0.2)",
              color: "rgba(255,182,193,0.7)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Compatibility spectrum */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        padding: "20px 24px",
        marginBottom: "28px",
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          margin: "0 0 16px",
        }}>Full compatibility spectrum</p>
        {results.map((m) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span style={{ fontSize: "14px", width: "20px", textAlign: "center" }}>{m.emoji}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", width: "100px", flexShrink: 0 }}>{m.name}</span>
            <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
              <div style={{
                height: "100%",
                width: `${Math.min(100, (m.score / (results[0].score || 1)) * 100)}%`,
                background: m.score === results[0].score
                  ? "linear-gradient(90deg, #ff1493, #da70d6)"
                  : `linear-gradient(90deg, ${m.color}88, ${m.color}44)`,
                borderRadius: "3px",
                transition: "width 1s ease",
              }} />
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", width: "24px", textAlign: "right" }}>{m.score}</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <button onClick={onReset} className="next-btn" style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50px",
          padding: "14px 40px",
          fontSize: "14px",
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.5)",
          cursor: "pointer",
        }}>
          ↩ Take the quiz again
        </button>
      </div>
    </div>
  );
}

function TopMatchCard({ model, rank }) {
  return (
    <div className="model-card" style={{
      background: `linear-gradient(135deg, rgba(255,20,147,0.1), rgba(218,112,214,0.07))`,
      border: "1px solid rgba(255,20,147,0.3)",
      borderRadius: "24px",
      padding: "32px",
      marginBottom: "14px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 40px rgba(255,20,147,0.12)",
    }}>
      <div style={{
        position: "absolute", top: "20px", right: "20px",
        background: "linear-gradient(135deg, #ff1493, #da70d6)",
        borderRadius: "20px", padding: "4px 14px",
        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
        fontWeight: 500, color: "#fff", letterSpacing: "1px",
      }}>💘 #1 MATCH</div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
        <div style={{
          width: "64px", height: "64px",
          background: `linear-gradient(135deg, ${model.color}33, ${model.color}11)`,
          border: `2px solid ${model.color}44`,
          borderRadius: "20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "28px", flexShrink: 0,
        }}>{model.emoji}</div>

        <div style={{ flex: 1, minWidth: "180px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "2px" }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "26px", fontWeight: 900, fontStyle: "italic",
              margin: 0, color: "#fff",
            }}>{model.name}</h3>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
              color: "rgba(255,255,255,0.3)", letterSpacing: "1px",
            }}>by {model.maker}</span>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
            color: "#ff69b4", margin: "0 0 10px", fontStyle: "italic",
          }}>{model.vibe}</p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
            color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6,
          }}>{model.tagline}</p>
        </div>
      </div>

      <div style={{
        marginTop: "20px", paddingTop: "20px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", gap: "10px", flexWrap: "wrap",
      }}>
        {model.tags.slice(0, 5).map((t, i) => (
          <span key={i} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
            padding: "4px 10px", borderRadius: "20px",
            background: `${model.color}18`,
            border: `1px solid ${model.color}30`,
            color: "rgba(255,255,255,0.45)",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function RunnerUpCard({ model, rank }) {
  return (
    <div className="model-card" style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "22px",
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: "14px", right: "14px",
        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
        color: "rgba(255,255,255,0.25)", letterSpacing: "1px",
      }}>#{rank}</div>

      <div style={{
        width: "44px", height: "44px",
        background: `${model.color}22`,
        border: `1px solid ${model.color}33`,
        borderRadius: "14px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px", marginBottom: "14px",
      }}>{model.emoji}</div>

      <h4 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "18px", fontWeight: 700, fontStyle: "italic",
        margin: "0 0 4px", color: "#fff",
      }}>{model.name}</h4>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
        color: "rgba(255,255,255,0.3)", margin: "0 0 10px",
      }}>by {model.maker}</p>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
        color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5,
      }}>{model.tagline}</p>
    </div>
  );
}
