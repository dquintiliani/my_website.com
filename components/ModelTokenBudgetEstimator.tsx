"use client";

import { useMemo, useState } from "react";

// ─── Types & constants ────────────────────────────────────────────────────────

interface ModelPricing {
  readonly id:                string;
  readonly name:              string;
  readonly provider:          string;
  readonly inputPricePer1K:   number;
  readonly outputPricePer1K:  number;
}

const MODELS: readonly ModelPricing[] = [
  { id: "gpt-4.1-mini",       name: "gpt-4.1-mini",        provider: "OpenAI",    inputPricePer1K: 0.15, outputPricePer1K: 0.60 },
  { id: "gpt-4.1",            name: "gpt-4.1",             provider: "OpenAI",    inputPricePer1K: 5.00, outputPricePer1K: 15.00 },
  { id: "claude-3.7-sonnet",  name: "Claude 3.7 Sonnet",   provider: "Anthropic", inputPricePer1K: 3.00, outputPricePer1K: 15.00 },
] as const;

interface FormState {
  modelId:               string;
  dailyActiveUsers:      number;
  requestsPerUserPerDay: number;
  avgPromptTokens:       number;
  avgCompletionTokens:   number;
  daysPerMonth:          number;
}

const DEFAULT_FORM: FormState = {
  modelId:               MODELS[0].id,
  dailyActiveUsers:      1000,
  requestsPerUserPerDay: 3,
  avgPromptTokens:       800,
  avgCompletionTokens:   400,
  daysPerMonth:          30,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safeNumber(value: string, fallback: number): number {
  const n = Number(value);
  return Number.isNaN(n) || n < 0 ? fallback : n;
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("en-CA");
}

function fmtUSD(n: number): string {
  return "$" + n.toFixed(2);
}

function budgetNarrative(monthlyCost: number): string {
  if (monthlyCost < 100)  return "Tiny line item. Treat it as experimental spend — ship it.";
  if (monthlyCost < 1000) return "Solid for a v1 feature. Worth tracking, but unlikely to cause real pain.";
  if (monthlyCost < 5000) return "Noticeable. Add monitoring, guardrails, and evaluate a cheaper fallback model.";
  return "This is real money. Strict rate limits, caching, and a clear business case are non-negotiable.";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ModelTokenBudgetEstimator() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);

  const selectedModel = useMemo(
    () => MODELS.find((m) => m.id === form.modelId) ?? MODELS[0],
    [form.modelId],
  );

  const metrics = useMemo(() => {
    const { dailyActiveUsers, requestsPerUserPerDay, avgPromptTokens, avgCompletionTokens, daysPerMonth } = form;

    const dailyRequests  = dailyActiveUsers * requestsPerUserPerDay;
    const dInTok         = dailyRequests * avgPromptTokens;
    const dOutTok        = dailyRequests * avgCompletionTokens;
    const dInCost        = (dInTok  / 1000) * selectedModel.inputPricePer1K;
    const dOutCost       = (dOutTok / 1000) * selectedModel.outputPricePer1K;
    const dTotal         = dInCost + dOutCost;

    return {
      dailyRequests,
      dInTok,  dOutTok,  dInCost,  dOutCost,  dTotal,
      mInTok:  dInTok  * daysPerMonth,
      mOutTok: dOutTok * daysPerMonth,
      mInCost: dInCost  * daysPerMonth,
      mOutCost:dOutCost * daysPerMonth,
      mTotal:  dTotal   * daysPerMonth,
    };
  }, [form, selectedModel]);

  function setModel(id: string) {
    setForm((p) => ({ ...p, modelId: id }));
  }

  function setField(field: keyof Omit<FormState, "modelId">, value: string) {
    const min = field === "daysPerMonth" ? 1 : 0;
    setForm((p) => ({ ...p, [field]: Math.max(min, safeNumber(value, 0)) }));
  }

  return (
    <div style={s.wrap}>

      {/* ── Header ── */}
      <p style={s.eyebrow}>Tool</p>
      <h2 style={s.heading}>
        Token budget <em style={s.headingEm}>estimator</em>.
      </h2>
      <p style={s.desc}>
        Estimate daily and monthly LLM token usage and cost based on your
        traffic and prompt assumptions.
      </p>

      {/* ── Model selector ── */}
      <p style={s.sectionLabel}>Model</p>
      <div style={s.modelGrid}>
        {MODELS.map((m) => {
          const active = m.id === form.modelId;
          return (
            <button
              key={m.id}
              onClick={() => setModel(m.id)}
              style={{
                ...s.modelBtn,
                ...(active ? s.modelBtnActive : {}),
              }}
              onMouseEnter={(e) => {
                if (!active)
                  (e.currentTarget as HTMLButtonElement).style.background = "#E8E3D9";
              }}
              onMouseLeave={(e) => {
                if (!active)
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <span style={s.modelName}>{m.name}</span>
              <span style={s.modelProvider}>{m.provider}</span>
              <span style={{ ...s.modelPricing, ...(active ? s.modelPricingActive : {}) }}>
                ${m.inputPricePer1K.toFixed(2)} in · ${m.outputPricePer1K.toFixed(2)} out / 1K tokens
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Parameters ── */}
      <p style={s.sectionLabel}>Parameters</p>
      <div style={s.inputsGrid}>
        <Field
          label="Daily active users"
          value={form.dailyActiveUsers}
          onChange={(v) => setField("dailyActiveUsers", v)}
        />
        <Field
          label="Requests per user / day"
          value={form.requestsPerUserPerDay}
          onChange={(v) => setField("requestsPerUserPerDay", v)}
        />
        <Field
          label="Avg prompt tokens (input)"
          value={form.avgPromptTokens}
          onChange={(v) => setField("avgPromptTokens", v)}
          hint="Includes system prompt, instructions, and any context you send."
        />
        <Field
          label="Avg completion tokens (output)"
          value={form.avgCompletionTokens}
          onChange={(v) => setField("avgCompletionTokens", v)}
          hint="Roughly how long the model's response is on average."
        />
        <Field
          label="Days per month"
          value={form.daysPerMonth}
          onChange={(v) => setField("daysPerMonth", v)}
          min={1}
        />
      </div>

      {/* ── Results ── */}
      <div style={s.results}>
        <div style={s.resultsHeader}>
          <span style={s.resultsTitle}>Estimated usage &amp; cost</span>
          <span style={s.resultsRequests}>
            Based on{" "}
            <strong style={{ color: "#1A1916", fontWeight: 600 }}>
              {fmtInt(metrics.dailyRequests)}
            </strong>{" "}
            requests / day
          </span>
        </div>

        <div style={s.statGrid}>
          <StatCard
            label="Daily"
            inTok={metrics.dInTok}
            outTok={metrics.dOutTok}
            total={metrics.dTotal}
            inCost={metrics.dInCost}
            outCost={metrics.dOutCost}
            unit="day"
          />
          <StatCard
            label={`Monthly (${form.daysPerMonth} days)`}
            inTok={metrics.mInTok}
            outTok={metrics.mOutTok}
            total={metrics.mTotal}
            inCost={metrics.mInCost}
            outCost={metrics.mOutCost}
            unit="month"
          />
        </div>

        {/* Narrative */}
        <div style={s.narrative}>
          <p style={s.narrativeLabel}>PM take</p>
          <p style={s.narrativeText}>{budgetNarrative(metrics.mTotal)}</p>
        </div>
      </div>

    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  hint,
  min = 0,
}: {
  label:    string;
  value:    number;
  onChange: (v: string) => void;
  hint?:    string;
  min?:     number;
}) {
  return (
    <div style={s.field}>
      <span style={s.fieldLabel}>{label}</span>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={s.fieldInput}
        onFocus={(e) => {
          (e.target as HTMLInputElement).style.borderColor = "#2C5F14";
          (e.target as HTMLInputElement).style.background  = "#fff";
        }}
        onBlur={(e) => {
          (e.target as HTMLInputElement).style.borderColor = "transparent";
          (e.target as HTMLInputElement).style.background  = "#E8E3D9";
        }}
      />
      {hint && <span style={s.fieldHint}>{hint}</span>}
    </div>
  );
}

function StatCard({
  label, inTok, outTok, total, inCost, outCost, unit,
}: {
  label:   string;
  inTok:   number;
  outTok:  number;
  total:   number;
  inCost:  number;
  outCost: number;
  unit:    string;
}) {
  return (
    <div style={s.statCard}>
      <p style={s.statCardLabel}>{label}</p>
      <div style={s.statRow}>
        <span style={s.statRowLabel}>Input tokens</span>
        <span style={s.statRowVal}>{fmtInt(inTok)}</span>
      </div>
      <div style={s.statRow}>
        <span style={s.statRowLabel}>Output tokens</span>
        <span style={s.statRowVal}>{fmtInt(outTok)}</span>
      </div>
      <div style={s.statCost}>
        <span style={s.statCostLabel}>{unit === "day" ? "Daily" : "Monthly"} cost</span>
        <span style={s.statCostVal}>{fmtUSD(total)}</span>
      </div>
      <p style={s.statCostBreakdown}>
        Input {fmtUSD(inCost)} · Output {fmtUSD(outCost)}
      </p>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  wrap: {
    backgroundColor: "#EEEAE3",
    padding:         "48px 40px",
    maxWidth:        "760px",
    margin:          "0 auto",
    fontFamily:      "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif",
  },

  // Header
  eyebrow: {
    fontSize:      "11px",
    fontWeight:    600,
    letterSpacing: "0.13em",
    textTransform: "uppercase",
    color:         "#2C5F14",
    margin:        "0 0 14px",
  },
  heading: {
    fontSize:      "clamp(24px, 3vw, 36px)",
    fontWeight:    700,
    color:         "#1A1916",
    letterSpacing: "-0.025em",
    lineHeight:    1.1,
    margin:        "0 0 10px",
  },
  headingEm: {
    fontStyle:  "italic",
    color:      "#2C5F14",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 900,
  },
  desc: {
    fontSize:   "14px",
    color:      "#7A7670",
    lineHeight: 1.7,
    margin:     "0 0 40px",
    maxWidth:   "520px",
  },

  // Section label
  sectionLabel: {
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color:         "#AEADA5",
    margin:        "0 0 12px",
  },

  // Model selector
  modelGrid: {
    display:      "flex",
    gap:          "10px",
    marginBottom: "32px",
    flexWrap:     "wrap",
  },
  modelBtn: {
    flex:          "1",
    minWidth:      "160px",
    padding:       "14px 16px",
    border:        "1px solid #D2CEC5",
    borderRadius:  "4px",
    background:    "transparent",
    cursor:        "pointer",
    textAlign:     "left",
    fontFamily:    "inherit",
    transition:    "border-color 0.15s ease, background 0.15s ease",
    display:       "flex",
    flexDirection: "column",
    gap:           "3px",
  },
  modelBtnActive: {
    borderColor: "#2C5F14",
    background:  "#DCE9D4",
  },
  modelName: {
    fontSize:   "13px",
    fontWeight: 600,
    color:      "#1A1916",
    display:    "block",
  },
  modelProvider: {
    fontSize:      "11px",
    color:         "#AEADA5",
    letterSpacing: "0.03em",
    display:       "block",
  },
  modelPricing: {
    fontSize:      "10px",
    fontWeight:    500,
    color:         "#7A7670",
    letterSpacing: "0.03em",
    marginTop:     "4px",
  },
  modelPricingActive: {
    color: "#2C5F14",
  },

  // Inputs
  inputsGrid: {
    display:             "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:                 "20px",
    marginBottom:        "32px",
  },
  field: {
    display:       "flex",
    flexDirection: "column",
    gap:           "6px",
  },
  fieldLabel: {
    fontSize:      "11px",
    fontWeight:    500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color:         "#AEADA5",
  },
  fieldInput: {
    background:        "#E8E3D9",
    border:            "1px solid transparent",
    borderRadius:      "4px",
    padding:           "11px 14px",
    fontSize:          "15px",
    fontWeight:        500,
    fontFamily:        "inherit",
    color:             "#1A1916",
    outline:           "none",
    transition:        "border-color 0.15s ease, background 0.15s ease",
    fontVariantNumeric:"tabular-nums",
    width:             "100%",
  },
  fieldHint: {
    fontSize:   "11px",
    color:      "#AEADA5",
    lineHeight: 1.5,
  },

  // Results
  results: {
    borderTop:  "1px solid #D2CEC5",
    paddingTop: "32px",
  },
  resultsHeader: {
    display:        "flex",
    alignItems:     "baseline",
    justifyContent: "space-between",
    marginBottom:   "24px",
    flexWrap:       "wrap",
    gap:            "8px",
  },
  resultsTitle: {
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color:         "#AEADA5",
  },
  resultsRequests: {
    fontSize:   "12px",
    color:      "#AEADA5",
  },

  // Stat cards
  statGrid: {
    display:             "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:                 "16px",
    marginBottom:        "24px",
  },
  statCard: {
    background:   "#E8E3D9",
    borderRadius: "4px",
    padding:      "20px",
  },
  statCardLabel: {
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color:         "#AEADA5",
    margin:        "0 0 14px",
  },
  statRow: {
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "baseline",
    marginBottom:   "6px",
  },
  statRowLabel: {
    fontSize: "12px",
    color:    "#7A7670",
  },
  statRowVal: {
    fontSize:           "12px",
    fontWeight:         600,
    color:              "#1A1916",
    fontVariantNumeric: "tabular-nums",
  },
  statCost: {
    marginTop:      "12px",
    paddingTop:     "12px",
    borderTop:      "1px solid #D2CEC5",
    display:        "flex",
    justifyContent: "space-between",
    alignItems:     "baseline",
  },
  statCostLabel: {
    fontSize: "12px",
    color:    "#7A7670",
  },
  statCostVal: {
    fontSize:           "22px",
    fontWeight:         700,
    color:              "#1A1916",
    letterSpacing:      "-0.02em",
    fontVariantNumeric: "tabular-nums",
  },
  statCostBreakdown: {
    fontSize:   "11px",
    color:      "#AEADA5",
    marginTop:  "4px",
  },

  // Narrative
  narrative: {
    borderLeft: "3px solid #2C5F14",
    padding:    "12px 0 12px 18px",
  },
  narrativeLabel: {
    fontSize:      "10px",
    fontWeight:    600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color:         "#2C5F14",
    margin:        "0 0 6px",
  },
  narrativeText: {
    fontSize:   "14px",
    color:      "#3D3B37",
    lineHeight: 1.7,
    fontWeight: 400,
    margin:     0,
  },
};