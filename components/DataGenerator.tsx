"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

// ─── Types ───────────────────────────────────────────────────────────────────

type DatasetId =
  | "ecommerce"
  | "analytics"
  | "adnetworks"
  | "crm"
  | "inventory"
  | "finance"
  | "support";

type ColumnStructure = "standard" | "complex";
type DataQuality = "clean" | "light" | "moderate" | "heavy";
type AllowDuplicates = "yes" | "no";

type CellValue = string | number | null;
type DataRow = Record<string, CellValue>;

interface DatasetOption {
  id: DatasetId;
  icon: string;
  title: string;
  description: string;
}

const DATASET_OPTIONS: DatasetOption[] = [
  { id: "ecommerce", icon: "🛒", title: "E-Commerce", description: "Orders, SKUs, discounts" },
  { id: "analytics", icon: "🌐", title: "Web Analytics", description: "Pageviews, clicks, drop-offs" },
  { id: "adnetworks", icon: "📢", title: "Ad Networks", description: "Spend, impressions, CTR" },
  { id: "crm", icon: "✉️", title: "CRM & Messaging", description: "Open rates, unsubscribes" },
  { id: "inventory", icon: "📦", title: "Inventory & ERP", description: "COGS, stock, lead times" },
  { id: "finance", icon: "💳", title: "Payment & Finance", description: "Payouts, fees, refunds" },
  { id: "support", icon: "🎧", title: "Support & Returns", description: "Tickets, reasons, ratings" },
];

const QUALITY_LABELS: Record<DataQuality, string> = {
  clean: "Clean (No Noise)",
  light: "Lightly Dirty (~5% errors)",
  moderate: "Moderately Dirty (~15% errors)",
  heavy: "Heavily Dirty (~30% errors)",
};

const ERROR_PROBABILITIES: Record<DataQuality, number> = {
  clean: 0,
  light: 0.05,
  moderate: 0.15,
  heavy: 0.3,
};

// ─── Random helpers ──────────────────────────────────────────────────────────

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(): string {
  const d = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  return d.toISOString().split("T")[0];
}

// ─── Dataset generators ──────────────────────────────────────────────────────
// Each generator returns `count` clean rows for its domain. When `isComplex`
// is true, a few flat fields are replaced with realistic semi-structured
// values (JSON blobs, pipe-delimited strings, key=value pairs) so the
// exported file also doubles as parsing/flattening practice.

const NAMES = ["Alice Smith", "Bob Jones", "Charlie Brown", "Diana Prince", "Evan Wright"];
const SKUS = ["SKU-1001-BLK", "SKU-2042-RED", "SKU-3099-BLU", "SKU-4010-WHT", "SKU-5088-GRN"];
const DISCOUNTS = ["0%", "5%", "10%", "15%", "25%"];
const CITIES = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];
const STATES = ["NY", "CA", "IL", "TX", "FL"];

function generateEcommerce(count: number, isComplex: boolean): DataRow[] {
  const data: DataRow[] = [];
  for (let i = 0; i < count; i++) {
    const price = Math.floor(Math.random() * 150) + 20;
    const qty = Math.floor(Math.random() * 4) + 1;
    const name = pick(NAMES);
    const email = `user_${1000 + i}@example.com`;

    const row: DataRow = {
      "Order ID": "ORD-" + (10000 + i),
      Date: randomDate(),
      SKU: pick(SKUS),
      Quantity: qty,
      "Unit Price": price,
      "Discount Rate": pick(DISCOUNTS),
      "Total Amount": price * qty,
    };

    if (isComplex) {
      row["Customer Info (JSON)"] = JSON.stringify({ name, email });
      row["Shipping Address (Delimited)"] =
        `${Math.floor(Math.random() * 900 + 100)} Main St | ${pick(CITIES)} | ${pick(STATES)}`;
      row["Item Attributes (KV Pairs)"] =
        `Color=${pick(["Red", "Blue", "Black"])}&Size=${pick(["S", "M", "L", "XL"])}&GiftWrap=${Math.random() > 0.5}`;
    } else {
      row["Customer Name"] = name;
      row["Customer Email"] = email;
    }

    data.push(row);
  }
  return data;
}

const PAGES = ["/home", "/products/view", "/cart", "/checkout", "/blog/news", "/search"];
const SEARCH_TERMS = ["running shoes", "wireless earbuds", "leather wallet", "desk lamp", "winter jacket", ""];
const BROWSERS = ["Chrome", "Safari", "Firefox", "Edge"];
const DEVICES = ["Desktop", "Mobile", "Tablet"];

function generateAnalytics(count: number, isComplex: boolean): DataRow[] {
  const data: DataRow[] = [];
  for (let i = 0; i < count; i++) {
    const row: DataRow = {
      "Session ID": "SESS-" + Math.floor(Math.random() * 899999 + 100000),
      Date: randomDate(),
      "Page Path": pick(PAGES),
      Pageviews: Math.floor(Math.random() * 12) + 1,
      Clicks: Math.floor(Math.random() * 8),
      "Site Search Term": pick(SEARCH_TERMS),
      "Cart Drop-off": Math.random() < 0.25 ? "Yes" : "No",
    };

    if (isComplex) {
      row["User Agent Context (JSON)"] = JSON.stringify({
        browser: pick(BROWSERS),
        device: pick(DEVICES),
        os: "macOS",
      });
      row["UTM Parameters (URL Query)"] =
        `utm_source=${pick(["google", "facebook", "newsletter"])}&utm_medium=${pick(["cpc", "email", "organic"])}&utm_campaign=${pick(["spring_sale", "retargeting"])}`;
    }

    data.push(row);
  }
  return data;
}

const PLATFORMS = ["Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads", "Pinterest Ads"];
const CAMPAIGNS = ["Spring Sale", "Retargeting Top Funnel", "Brand Awareness", "Black Friday Prep"];

function generateAdNetworks(count: number, isComplex: boolean): DataRow[] {
  const data: DataRow[] = [];
  for (let i = 0; i < count; i++) {
    const spend = Math.floor(Math.random() * 1500) + 100;
    const impressions = spend * (Math.floor(Math.random() * 30) + 20);
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01));
    const conversions = Math.floor(clicks * (Math.random() * 0.1));

    const row: DataRow = {
      Date: randomDate(),
      Platform: pick(PLATFORMS),
      "Campaign Name": pick(CAMPAIGNS),
      "Ad Spend ($)": spend,
      Impressions: impressions,
      Clicks: clicks,
      CTR: ((clicks / impressions) * 100).toFixed(2) + "%",
      Conversions: conversions,
    };

    if (isComplex) {
      row["Targeting Demographics (Piped)"] =
        `Age: 18-35 | Gender: All | Location: US,CA | Interest: ${pick(["Tech", "Fashion", "Fitness"])}`;
      row["Ad Placement Metadata (JSON)"] = JSON.stringify({
        placement_type: pick(["Feed", "Story", "Search"]),
        bid_strategy: "Target CPA",
      });
    }

    data.push(row);
  }
  return data;
}

const CHANNELS_CRM = ["Email", "SMS"];
const FLOW_TYPES = ["Welcome Series", "Abandoned Cart", "Post-Purchase", "Win-Back Campaign"];

function generateCrm(count: number, isComplex: boolean): DataRow[] {
  const data: DataRow[] = [];
  for (let i = 0; i < count; i++) {
    const sent = Math.floor(Math.random() * 5000) + 1000;
    const opens = Math.floor(sent * (Math.random() * 0.35 + 0.15));

    const row: DataRow = {
      "Send Date": randomDate(),
      Channel: pick(CHANNELS_CRM),
      "Flow Name": pick(FLOW_TYPES),
      "Messages Sent": sent,
      Opens: opens,
      "Open Rate": ((opens / sent) * 100).toFixed(1) + "%",
      "Flow Revenue ($)": Math.floor(Math.random() * 3000),
      Unsubscribes: Math.floor(Math.random() * 15),
    };

    if (isComplex) {
      row["Audience Tags (Array List)"] =
        `[${pick(["VIP", "New User", "Inactive"])}, ${pick(["High Spender", "Discount Hunter"])}]`;
      row["Engagement Breakdown (KV)"] =
        `Delivered=${sent - 12}; Bounced=12; SpamReports=${Math.floor(Math.random() * 3)}`;
    }

    data.push(row);
  }
  return data;
}

const CATEGORIES_INVENTORY = ["Apparel", "Electronics", "Home Goods", "Beauty", "Accessories"];

function generateInventory(count: number, isComplex: boolean): DataRow[] {
  const data: DataRow[] = [];
  for (let i = 0; i < count; i++) {
    const cogs = Math.floor(Math.random() * 80) + 5;
    const landedCost = Number((cogs * (1 + Math.random() * 0.25)).toFixed(2));

    const row: DataRow = {
      SKU: "SKU-" + (2000 + i),
      Category: pick(CATEGORIES_INVENTORY),
      "Stock Level": Math.floor(Math.random() * 1000),
      "Unit COGS ($)": cogs,
      "Landed Cost ($)": landedCost,
      "Lead Time (Days)": Math.floor(Math.random() * 30) + 5,
      "Reorder Triggered": Math.random() < 0.2 ? "Yes" : "No",
    };

    if (isComplex) {
      row["Warehouse Locations (Delimited)"] =
        `Primary: WH-A (${Math.floor(Math.random() * 100)}) | Secondary: WH-B (${Math.floor(Math.random() * 50)})`;
      row["Cost Matrix (JSON)"] = JSON.stringify({
        base_cogs: cogs,
        freight_fee: Number((landedCost - cogs).toFixed(2)),
        duty_tax: 2.5,
      });
    }

    data.push(row);
  }
  return data;
}

const GATEWAYS = ["Stripe", "PayPal", "Shopify Payments", "Klarna", "Apple Pay"];

function generateFinance(count: number, isComplex: boolean): DataRow[] {
  const data: DataRow[] = [];
  for (let i = 0; i < count; i++) {
    const gross = Math.floor(Math.random() * 500) + 20;
    const fee = Number((gross * 0.029 + 0.3).toFixed(2));
    const isRefund = Math.random() < 0.08;
    const isChargeback = !isRefund && Math.random() < 0.02;

    const refundAmt = isRefund ? gross : 0;
    const net = isRefund ? -fee : isChargeback ? -gross - 15 : gross - fee;

    const row: DataRow = {
      "Payout ID": "PO-" + (5000 + i),
      Date: randomDate(),
      Gateway: pick(GATEWAYS),
      "Gross Amount ($)": gross,
      "Processing Fee ($)": fee,
      "Refund Amount ($)": refundAmt,
      "Chargeback Status": isChargeback ? "Disputed" : "None",
      "Net Payout ($)": Number(net.toFixed(2)),
    };

    if (isComplex) {
      row["Transaction Breakdown (JSON)"] = JSON.stringify({
        card_brand: pick(["Visa", "Mastercard", "Amex"]),
        last4: Math.floor(Math.random() * 8999 + 1000),
        auth_code: "AUTH_" + Math.floor(Math.random() * 99999),
      });
      row["Settlement Details (Piped)"] =
        `Batch: ${Math.floor(Math.random() * 9000 + 1000)} | Currency: USD | Clearing Days: 2`;
    }

    data.push(row);
  }
  return data;
}

const RETURN_REASONS = ["Defective", "Wrong Size", "Changed Mind", "Item Not as Described"];
const SUPPORT_CHANNELS = ["Email Ticket", "Live Chat", "Phone Support"];

function generateSupport(count: number, isComplex: boolean): DataRow[] {
  const data: DataRow[] = [];
  for (let i = 0; i < count; i++) {
    const rating = Math.floor(Math.random() * 5) + 1;
    const isReturn = Math.random() < 0.35;

    const row: DataRow = {
      "Ticket ID": "TICK-" + (8000 + i),
      "Date Opened": randomDate(),
      "Support Channel": pick(SUPPORT_CHANNELS),
      "Return Requested": isReturn ? "Yes" : "No",
      "Return Reason": isReturn ? pick(RETURN_REASONS) : "N/A",
      "Customer Rating (1-5)": rating,
      "Review Snippet": rating >= 4 ? "Great service!" : "Resolution took too long.",
    };

    if (isComplex) {
      row["Agent Conversation Log (Text & Timestamps)"] =
        `[10:15 AM] User: Help with return. | [10:17 AM] Agent: Processing. | Status: ${rating >= 3 ? "Resolved" : "Escalated"}`;
      row["Ticket Metadata (JSON)"] = JSON.stringify({
        tags: [isReturn ? "Return" : "General", "Priority_" + (rating < 3 ? "High" : "Low")],
        agent_id: "AGT-" + Math.floor(Math.random() * 50 + 1),
      });
    }

    data.push(row);
  }
  return data;
}

const GENERATORS: Record<DatasetId, (count: number, isComplex: boolean) => DataRow[]> = {
  ecommerce: generateEcommerce,
  analytics: generateAnalytics,
  adnetworks: generateAdNetworks,
  crm: generateCrm,
  inventory: generateInventory,
  finance: generateFinance,
  support: generateSupport,
};

// ─── Dirty data injection ────────────────────────────────────────────────────
// Mutates a copy of the clean rows: blanks fields, adds stray whitespace,
// flips case, reformats dates, corrupts numbers, and (optionally) appends
// duplicate rows — the same kinds of mess a real export would have.

function applyDataQuality(rows: DataRow[], quality: DataQuality, allowDuplicates: AllowDuplicates): DataRow[] {
  if (rows.length === 0) return rows;

  const data = rows.map((row) => ({ ...row }));
  const prob = ERROR_PROBABILITIES[quality];
  const keys = Object.keys(data[0]);

  if (prob > 0) {
    for (const row of data) {
      for (const key of keys) {
        if (Math.random() >= prob) continue;
        const val = row[key];
        const errorType = Math.floor(Math.random() * 5);

        switch (errorType) {
          case 0:
            row[key] = "";
            break;
          case 1:
            if (typeof val === "string" && val !== "") {
              row[key] = Math.random() > 0.5 ? `  ${val}` : `${val}  `;
            }
            break;
          case 2:
            if (typeof val === "string" && val.length > 2) {
              row[key] = Math.random() > 0.5 ? val.toUpperCase() : val.toLowerCase();
            }
            break;
          case 3:
            if (key.toLowerCase().includes("date") && typeof val === "string" && val.includes("-")) {
              const parts = val.split("-");
              row[key] = `${parts[1]}/${parts[2]}/${parts[0]}`;
            } else if (typeof val === "string" && val.length > 4) {
              row[key] = val.slice(0, -1);
            }
            break;
          case 4:
            if (typeof val === "number") {
              row[key] = Math.random() > 0.5 ? val * 10 : null;
            }
            break;
        }
      }
    }
  }

  if (allowDuplicates === "yes") {
    const dupRate = prob === 0 ? 0.05 : prob / 2;
    const duplicateCount = Math.floor(data.length * dupRate);
    for (let i = 0; i < duplicateCount; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      data.push({ ...data[randomIndex] });
    }
  }

  return data;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function DataGenerator() {
  const [selectedDataset, setSelectedDataset] = useState<DatasetId>("ecommerce");
  const [rowCount, setRowCount] = useState(100);
  const [columnStructure, setColumnStructure] = useState<ColumnStructure>("standard");
  const [dataQuality, setDataQuality] = useState<DataQuality>("moderate");
  const [allowDuplicates, setAllowDuplicates] = useState<AllowDuplicates>("yes");
  const [data, setData] = useState<DataRow[]>([]);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  function handleGenerate() {
    const clean = GENERATORS[selectedDataset](rowCount, columnStructure === "complex");
    setData(applyDataQuality(clean, dataQuality, allowDuplicates));
  }

  // Random sample data can only be generated client-side — seeding it during
  // render would produce different values on the server vs. the client and
  // trigger a hydration mismatch, so generate the first batch after mount.
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDownload() {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    const filename = `${selectedDataset}_${columnStructure}_${dataQuality}_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
  }

  return (
    <main className="min-h-screen bg-[#fafafc] bg-[radial-gradient(circle_at_10%_20%,rgba(120,86,255,0.08)_0%,transparent_40%),radial-gradient(circle_at_90%_80%,rgba(120,86,255,0.08)_0%,transparent_40%)] px-5 py-10 text-[#110e2e]">
      <div className="mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-[#f2eeff] px-3.5 py-1.5 text-[0.85rem] font-semibold tracking-[0.2px] text-[#7856ff]">
            Data Studio
          </span>
          <h1 className="mb-3 text-[2.75em] font-bold leading-[1.15] tracking-[-1px]">
            Sample Data Generator
          </h1>
          <p className="mx-auto max-w-[560px] text-[1.05rem] text-[#626577]">
            Generate realistic mock e-commerce-adjacent datasets for analytics practice, dirty
            data cleaning, and ETL pipeline design.
          </p>
        </div>

        {/* Dataset picker */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {DATASET_OPTIONS.map((opt) => {
            const isSelected = opt.id === selectedDataset;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedDataset(opt.id)}
                className={
                  "flex max-w-[250px] flex-1 basis-[200px] items-center gap-3 rounded-xl border px-[18px] py-3.5 text-left transition-all duration-200 " +
                  (isSelected
                    ? "border-2 border-[#7856ff] bg-white shadow-[0_8px_20px_rgba(120,86,255,0.15)]"
                    : "border-[#d2c8ff] bg-[#f2eeff] hover:-translate-y-0.5 hover:border-[#7856ff] hover:shadow-[0_6px_16px_rgba(120,86,255,0.1)]")
                }
              >
                <span className="text-[1.2rem]">{opt.icon}</span>
                <span className="min-w-0 flex-grow overflow-hidden">
                  <span className="block truncate text-[0.92rem] font-semibold">{opt.title}</span>
                  <span className="block truncate text-[0.78rem] text-[#626577]">{opt.description}</span>
                </span>
                <span
                  className={
                    "flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border text-[10px] font-bold text-white " +
                    (isSelected ? "border-[#7856ff] bg-[#7856ff]" : "border-[#d2c8ff] bg-white")
                  }
                >
                  {isSelected ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-wrap items-end gap-6 rounded-2xl border border-[#e2e4ed] bg-white p-6 px-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="flex min-w-[180px] flex-1 flex-col gap-2">
            <label className="text-[0.85rem] font-semibold">Row Count</label>
            <input
              type="number"
              min={10}
              max={1000}
              value={rowCount}
              onChange={(e) => setRowCount(Math.min(1000, Math.max(10, Number(e.target.value) || 10)))}
              className="w-full rounded-lg border border-[#e2e4ed] bg-[#fafafc] px-3.5 py-2.5 text-[0.9rem] outline-none transition-all duration-200 focus:border-[#7856ff] focus:bg-white focus:shadow-[0_0_0_3px_rgba(120,86,255,0.15)]"
            />
          </div>

          <div className="flex min-w-[180px] flex-1 flex-col gap-2">
            <label className="text-[0.85rem] font-semibold">Column Structure</label>
            <select
              value={columnStructure}
              onChange={(e) => setColumnStructure(e.target.value as ColumnStructure)}
              className="w-full rounded-lg border border-[#e2e4ed] bg-[#fafafc] px-3.5 py-2.5 text-[0.9rem] outline-none transition-all duration-200 focus:border-[#7856ff] focus:bg-white focus:shadow-[0_0_0_3px_rgba(120,86,255,0.15)]"
            >
              <option value="standard">Standard (Flat Fields)</option>
              <option value="complex">Complex / Semi-Structured (JSON, Pipes, KV)</option>
            </select>
          </div>

          <div className="flex min-w-[180px] flex-1 flex-col gap-2">
            <label className="text-[0.85rem] font-semibold">Data Quality (Dirty Data)</label>
            <select
              value={dataQuality}
              onChange={(e) => setDataQuality(e.target.value as DataQuality)}
              className="w-full rounded-lg border border-[#e2e4ed] bg-[#fafafc] px-3.5 py-2.5 text-[0.9rem] outline-none transition-all duration-200 focus:border-[#7856ff] focus:bg-white focus:shadow-[0_0_0_3px_rgba(120,86,255,0.15)]"
            >
              {(Object.keys(QUALITY_LABELS) as DataQuality[]).map((q) => (
                <option key={q} value={q}>
                  {QUALITY_LABELS[q]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex min-w-[180px] flex-1 flex-col gap-2">
            <label className="text-[0.85rem] font-semibold">Allow Duplicates</label>
            <select
              value={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.value as AllowDuplicates)}
              className="w-full rounded-lg border border-[#e2e4ed] bg-[#fafafc] px-3.5 py-2.5 text-[0.9rem] outline-none transition-all duration-200 focus:border-[#7856ff] focus:bg-white focus:shadow-[0_0_0_3px_rgba(120,86,255,0.15)]"
            >
              <option value="yes">Yes (Inject Duplicate Rows)</option>
              <option value="no">No Duplicates</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex h-[41px] items-center justify-center gap-2 rounded-full bg-[#110e2e] px-7 text-[0.9rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#262152] hover:shadow-[0_4px_12px_rgba(17,14,46,0.15)]"
          >
            Generate Dataset →
          </button>
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-[#e2e4ed] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[1.1rem] font-bold">Data Preview</h3>
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-full bg-[#7856ff] px-[22px] py-2.5 text-[0.88rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#633ef2] hover:shadow-[0_4px_12px_rgba(120,86,255,0.25)]"
            >
              Download Excel (.xlsx)
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#e2e4ed]">
            <table className="w-full border-collapse whitespace-pre text-[0.85rem]">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="border-b-2 border-[#e2e4ed] bg-[#f0f1f5] px-4 py-3 text-left font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 5).map((row, i) => (
                  <tr key={i} className="hover:[&>td]:bg-[#f2eeff]">
                    {headers.map((header) => (
                      <td key={header} className="border-b border-[#e2e4ed] px-4 py-3 last:border-b-0">
                        {row[header] === null || row[header] === undefined ? "" : String(row[header])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-[0.85rem] text-[#626577]">
            Showing {Math.min(5, data.length)} of <strong>{data.length}</strong> total generated rows
          </div>
        </div>
      </div>
    </main>
  );
}
