/* Vercel serverless entry. An Express app is a (req, res) handler, so it can be
   exported directly. vercel.json rewrites every /api/* path here, and the routes
   inside app.js are already declared with their /api prefix. */
export { default } from "../server/app.js";
