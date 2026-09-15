/* The Express app with no listener attached, so it can be used two ways:
   - server/index.js  listens on a port for local dev / a long-running host
   - api/index.js     exported as a Vercel serverless function
   An Express app is itself a (req, res) handler, which is why both work. */

import express from "express";
import cors from "cors";
import "dotenv/config";

import { CATALOGUE } from "./catalogue.data.js";

const app = express();
const isProd = process.env.NODE_ENV === "production";

app.use(express.json({ limit: "64kb" }));
app.use(cors({ origin: isProd ? true : "http://localhost:5173" }));

/* --------------------------------------------------------------------------
   A very small in-memory rate limit. Enough to stop a bored script hammering
   the enquiry endpoint. NB: on serverless this is per-instance and resets on
   cold start — move to Upstash/Redis if it needs to actually hold.
   -------------------------------------------------------------------------- */
const hits = new Map();
function rateLimit({ windowMs = 60_000, max = 5 }) {
  return (req, res, next) => {
    const key = req.headers["x-forwarded-for"] || req.ip;
    const now = Date.now();
    const rec = hits.get(key) ?? { count: 0, reset: now + windowMs };
    if (now > rec.reset) { rec.count = 0; rec.reset = now + windowMs; }
    rec.count += 1;
    hits.set(key, rec);
    if (rec.count > max) {
      return res.status(429).json({ error: "Too many requests. Try again shortly." });
    }
    next();
  };
}

app.get("/api/health", (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

app.get("/api/catalogue", (_req, res) => {
  res.json({ count: CATALOGUE.length, items: CATALOGUE });
});

// Sample rows for a campaign. Replace with a real query when the pipeline lands.
app.get("/api/campaign/:id/rows", (req, res) => {
  const { id } = req.params;
  if (!/^MXQ-\d{4}-\d{4}$/.test(id)) {
    return res.status(400).json({ error: "Malformed campaign reference." });
  }
  res.json({
    campaign: id,
    schema: ["design_id", "assay", "value", "censor", "flag", "plate", "run_date", "instrument"],
    rows: [
      { design_id: "DSN-00412", assay: "SPR_KD",     value: "4.2e-10", censor: "—", flag: "OK",        plate: "P07", run_date: "2026-03-11", instrument: "SPR-02" },
      { design_id: "DSN-00413", assay: "SPR_KD",     value: "1.0e-06", censor: ">", flag: "LOD_UPPER", plate: "P07", run_date: "2026-03-11", instrument: "SPR-02" },
      { design_id: "DSN-00414", assay: "SPR_KD",     value: "—",       censor: "—", flag: "EXPR_FAIL", plate: "P07", run_date: "2026-03-11", instrument: "—" },
      { design_id: "DSN-00415", assay: "NANODSF_TM", value: "71.4",    censor: "—", flag: "OK",        plate: "P07", run_date: "2026-03-12", instrument: "DSF-01" },
      { design_id: "DSN-00415", assay: "ACSINS_DL",  value: "8.3",     censor: "—", flag: "OK",        plate: "P08", run_date: "2026-03-12", instrument: "PLT-04" },
    ],
  });
});

app.post("/api/enquiry", rateLimit({ max: 5 }), async (req, res) => {
  const { name = "", email = "", org = "", area = "", message = "", campaign = [] } = req.body ?? {};

  const errors = {};
  if (!String(name).trim()) errors.name = "Required.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) errors.email = "Valid work email required.";
  if (String(message).length > 4000) errors.message = "Too long.";
  if (Object.keys(errors).length) return res.status(400).json({ error: "Validation failed", errors });

  const enquiry = {
    receivedAt: new Date().toISOString(),
    reference: `MXQ-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`,
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    org: String(org).trim(),
    area: String(area).trim(),
    message: String(message).trim(),
    campaign: Array.isArray(campaign) ? campaign.slice(0, 20) : [],
  };

  const formUrl = process.env.GOOGLE_FORM_ACTION_URL;
  if (formUrl && process.env.GF_ENTRY_NAME) {
    try {
      const body = new URLSearchParams({
        [process.env.GF_ENTRY_NAME]: enquiry.name,
        [process.env.GF_ENTRY_EMAIL ?? "entry.email"]: enquiry.email,
        [process.env.GF_ENTRY_ORG ?? "entry.org"]: enquiry.org,
        [process.env.GF_ENTRY_AREA ?? "entry.area"]: enquiry.area,
        [process.env.GF_ENTRY_MESSAGE ?? "entry.message"]: enquiry.message,
      });
      await fetch(formUrl, { method: "POST", body });
    } catch (err) {
      console.error("[enquiry] google form forward failed:", err.message);
      // deliberately not fatal — we already have the enquiry
    }
  } else {
    console.log("[enquiry] no GOOGLE_FORM_ACTION_URL set, logging only:", enquiry);
  }

  res.status(201).json({ ok: true, reference: enquiry.reference });
});

export default app;
