/* Local dev / long-running host. On Vercel this file is not used —
   api/index.js exports the same app as a serverless function instead. */

import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import app from "./app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.API_PORT || 8787;
const isProd = process.env.NODE_ENV === "production";

// In production outside Vercel, serve the built front end from the same process.
if (isProd) {
  const dist = path.join(__dirname, "..", "dist");
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => {
  console.log(`API on http://localhost:${PORT}${isProd ? " (serving dist)" : ""}`);
});
