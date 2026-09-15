# Mextropic AI — site

React + Vite front end, Express API. Design source of truth is the
`Mextropic — V2` artboard in Figma (`lqn7ySvScG1B6s8IE2BDOw`).

## Run it

```bash
npm install
cp .env.example .env     # optional — the app runs fine without it
npm run dev              # Vite on :5173, API on :8787, /api proxied
```

Production:

```bash
npm run build            # → dist/
npm start                # Express serves dist/ + /api on :8787
```

## Layout

```
index.html               Vite entry
src/
  main.jsx               React root
  App.jsx                section order + scroll-reveal + campaign state
  components/            one file per section
    Nav Hero DataContract Loop CatalogueRail Testimonial Enquiry Footer
    Motif.jsx            generated SVG card visuals
  data/catalogue.js      catalogue, parquet rows, loop steps, credibility
  styles/
    tokens.css           design tokens — mirrors the Figma variable collection
    app.css              everything else
server/
  app.js                 Express routes, no listener: /api/health, /api/catalogue,
                         /api/campaign/:id/rows, POST /api/enquiry
  index.js               listens on a port for local dev / a long-running host
  catalogue.data.js      server copy of the catalogue
api/
  index.js               Vercel serverless entry — re-exports server/app.js
public/                  hero.mp4, hero-poster.jpg, testimonial.jpg
CREDITS.md               image provenance and licences — keep it accurate
```

## Design tokens

`src/styles/tokens.css` mirrors the `Mextropic brand` mode in Figma. Change a
value there and it moves everywhere, same as the Figma variable does.

`--signal` is the action colour (currently `#7C2634`). It is dark — relative
luminance 0.059 — so **`--on-signal` must stay light**. Ink on it is 1.8:1 and
unreadable; white is 9.6:1.

## API

| Method | Route | Notes |
|---|---|---|
| GET | `/api/health` | uptime ping |
| GET | `/api/catalogue` | 20 categories |
| GET | `/api/campaign/:id/rows` | sample `results.parquet` rows; `:id` must match `MXQ-0000-0000` |
| POST | `/api/enquiry` | validates, forwards to Google Form if configured, returns a reference |

`POST /api/enquiry` is rate limited to 5/min per IP (in-memory — swap for Redis
if this ever runs on more than one instance).

### Google Form

Set `GOOGLE_FORM_ACTION_URL` and the `GF_ENTRY_*` ids in `.env`. Find them by
opening the form, viewing source, and locating each `entry.XXXXXXX` name. With
nothing configured the endpoint still returns 201 and logs the enquiry, so local
dev needs no external dependency.

## Before this ships

- **The testimonial quote is sample copy**, marked in the UI. Replace with an
  approved customer quote or remove the section. If you do add a real named
  quote, read `CREDITS.md` first — the stock photo beside it must not stay, or
  it reads as a portrait of the person being quoted.
- **`GOOGLE_FORM_ACTION_URL` is unset**, so enquiries are logged, not delivered.
- `static-legacy.html` is the previous hand-written single-file version, kept
  for reference. Safe to delete once this is live.

## Deploying

Vercel, from this repo. `vercel.json` sets the Vite preset (build `npm run build`,
output `dist`) and rewrites every `/api/*` path to the serverless function in
`api/index.js`, which re-exports the Express app from `server/app.js`.

That split is the whole trick: `server/app.js` declares the routes and attaches
no listener, so the same app can be a serverless handler on Vercel and a
long-running process locally via `server/index.js`.

Set `GOOGLE_FORM_ACTION_URL` and the `GF_ENTRY_*` ids as project environment
variables — the serverless function reads the same names as `.env`.

Note the rate limit in `server/app.js` is per-instance in-memory, so on Vercel it
resets on cold start and is not shared between concurrent instances.
