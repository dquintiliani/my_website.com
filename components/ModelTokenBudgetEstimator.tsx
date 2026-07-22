"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Types & constants ────────────────────────────────────────────────────────

interface ModelPricing {
  readonly id:                string;
  readonly name:              string;
  readonly provider:          string;
  readonly inputPricePer1K:   number;
  readonly outputPricePer1K:  number;
}

const MODELS: readonly ModelPricing[] = [
  // Cheap & fast tier (great for high-volume / simple tasks)
  { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash-Lite", provider: "Google",     inputPricePer1K: 0.00010, outputPricePer1K: 0.00040 },
  { id: "grok-4-fast",           name: "Grok 4 Fast",           provider: "xAI",        inputPricePer1K: 0.00020, outputPricePer1K: 0.00050 },
  { id: "gpt-5-mini",            name: "GPT-5 Mini",            provider: "OpenAI",     inputPricePer1K: 0.00025, outputPricePer1K: 0.00200 },
  { id: "claude-haiku-4.5",      name: "Claude Haiku 4.5",      provider: "Anthropic",  inputPricePer1K: 0.00100, outputPricePer1K: 0.00500 },

  // Mid-tier balanced
  { id: "gemini-2.5-flash",      name: "Gemini 2.5 Flash",      provider: "Google",     inputPricePer1K: 0.00030, outputPricePer1K: 0.00250 },
  { id: "claude-sonnet-4.5",     name: "Claude Sonnet 4.5",     provider: "Anthropic",  inputPricePer1K: 0.00300, outputPricePer1K: 0.01500 },
  { id: "gpt-5.2",               name: "GPT-5.2",               provider: "OpenAI",     inputPricePer1K: 0.00175, outputPricePer1K: 0.01400 },

  // Flagship / reasoning-heavy
  { id: "grok-4.20-beta",        name: "Grok 4.20 Beta",        provider: "xAI",        inputPricePer1K: 0.00200, outputPricePer1K: 0.00600 },
  { id: "gpt-5.4",               name: "GPT-5.4",               provider: "OpenAI",     inputPricePer1K: 0.00250, outputPricePer1K: 0.01500 },
  { id: "claude-opus-4.5",       name: "Claude Opus 4.5",       provider: "Anthropic",  inputPricePer1K: 0.00500, outputPricePer1K: 0.02500 },
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
    <div className="tbe-page">
      <div className="tbe-inner">

        {/* ── Header ── */}
        <p className="section-label">Tool</p>
        <h1 className="tbe-heading">
          Token budget <em>estimator</em>.
        </h1>
        <p className="tbe-desc">
          Estimate daily and monthly LLM token usage and cost based on your
          traffic and prompt assumptions. Updated March 2026 pricing.
        </p>

        {/* ── Model selector ── */}
        <div className="tbe-block">
          <p className="section-label tbe-block-label">Model</p>
          <div className="tbe-model-grid">
            {MODELS.map((m) => {
              const active = m.id === form.modelId;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModel(m.id)}
                  className="tbe-model"
                  data-active={active}
                  aria-pressed={active}
                >
                  {active && (
                    <span className="tbe-model-check">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                  <span className="tbe-model-name">{m.name}</span>
                  <span className="tbe-model-provider">{m.provider}</span>
                  <span className="tbe-model-pricing">
                    ${m.inputPricePer1K.toFixed(4)} in · ${m.outputPricePer1K.toFixed(4)} out / 1K tokens
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Parameters ── */}
        <div className="tbe-block">
          <p className="section-label tbe-block-label">Parameters</p>
          <div className="tbe-params-grid">
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
        </div>

        {/* ── Results ── */}
        <div className="tbe-results">
          <div className="tbe-results-head">
            <p className="section-label">Estimated usage &amp; cost</p>
            <p className="tbe-results-sub">
              Based on <strong>{fmtInt(metrics.dailyRequests)}</strong> requests / day
            </p>
          </div>

          <div className="tbe-stat-grid">
            <StatBlock
              label="Daily"
              inTok={metrics.dInTok}
              outTok={metrics.dOutTok}
              total={metrics.dTotal}
              inCost={metrics.dInCost}
              outCost={metrics.dOutCost}
            />
            <StatBlock
              label={`Monthly (${form.daysPerMonth} days)`}
              inTok={metrics.mInTok}
              outTok={metrics.mOutTok}
              total={metrics.mTotal}
              inCost={metrics.mInCost}
              outCost={metrics.mOutCost}
            />
          </div>

          {/* Narrative */}
          <div className="tbe-narrative">
            <p className="tbe-narrative-label">PM take</p>
            <p className="tbe-narrative-text">{budgetNarrative(metrics.mTotal)}</p>
          </div>
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
    <div className="tbe-field">
      <Label className="tbe-field-label">{label}</Label>
      <Input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="tbe-field-hint">{hint}</p>}
    </div>
  );
}

function StatBlock({
  label, inTok, outTok, total, inCost, outCost,
}: {
  label:   string;
  inTok:   number;
  outTok:  number;
  total:   number;
  inCost:  number;
  outCost: number;
}) {
  return (
    <div className="tbe-stat">
      <p className="tbe-stat-label">{label}</p>
      <p className="tbe-stat-cost">{fmtUSD(total)}</p>
      <p className="tbe-stat-breakdown">
        Input {fmtUSD(inCost)} · Output {fmtUSD(outCost)}
      </p>
      <div className="tbe-stat-tokens">
        <div className="tbe-stat-row">
          <span>Input tokens</span>
          <span>{fmtInt(inTok)}</span>
        </div>
        <div className="tbe-stat-row">
          <span>Output tokens</span>
          <span>{fmtInt(outTok)}</span>
        </div>
      </div>
    </div>
  );
}
