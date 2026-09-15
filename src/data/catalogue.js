/* The catalogue, derived from mextropic-demo-v3.html — 6 core campaign
   categories plus 14 extended scientific domains. Card gradients come from the
   brand palette; `fam` indexes GRADIENTS below. */

export const GRADIENTS = [
  ["#1D2D3D", "#5980A6"], // slate → steel
  ["#5980A6", "#7AA8D6"], // steel → light steel
  ["#5E1F2B", "#C4384A"], // crimson, drawn from the hero footage
  ["#4A5259", "#8A95A3"], // graphite
  ["#2C4056", "#6E93B8"], // deep steel
];

export const CATALOGUE = [
  { title: "Expression & Production",     meta: "Core campaign · 7 assays",  fam: 0, motif: "helix" },
  { title: "Binding Kinetics & Affinity", meta: "Core campaign · 6 assays",  fam: 1, motif: "curve" },
  { title: "Biophysical Developability",  meta: "Core campaign · 10 assays", fam: 4, motif: "sigmoid" },
  { title: "Cell-Based & Functional",     meta: "Core campaign · 6 assays",  fam: 0, motif: "wells" },
  { title: "Bioprocess & Fermentation",   meta: "Core campaign · 5 assays",  fam: 2, motif: "bars" },
  { title: "Custom Programmes",           meta: "Scoped · by request",       fam: 3, motif: "graph" },
  { title: "Genetic Engineering",         meta: "Extended · 3 assays",       fam: 1, motif: "lattice" },
  { title: "Biochemical Screening",       meta: "Extended · 5 assays",       fam: 4, motif: "wells" },
  { title: "Safety & ADMET",              meta: "Extended · 9 assays",       fam: 2, motif: "curve" },
  { title: "Pharmacology",                meta: "Extended · 4 assays",       fam: 0, motif: "sigmoid" },
  { title: "Microbiology",                meta: "Extended · 3 assays",       fam: 1, motif: "wells" },
  { title: "Synthetic Biology",           meta: "Extended · 1 assay",        fam: 2, motif: "graph" },
  { title: "Protein Engineering",         meta: "Extended · 2 assays",       fam: 0, motif: "bars" },
  { title: "Proteomics",                  meta: "Extended · 11 assays",      fam: 4, motif: "bars" },
  { title: "Metabolomics",                meta: "Extended · 4 assays",       fam: 2, motif: "bars" },
  { title: "Genomics & Transcriptomics",  meta: "Extended · 6 assays",       fam: 1, motif: "helix" },
  { title: "Epigenomics",                 meta: "Extended · 5 assays",       fam: 0, motif: "lolli" },
  { title: "Structural Biology",          meta: "Extended · 2 assays",       fam: 4, motif: "lattice" },
  { title: "Hit Identification",          meta: "Extended · 1 assay",        fam: 3, motif: "ring" },
  { title: "Chemistry",                   meta: "Extended · 1 assay",        fam: 2, motif: "ring" },
];

/* Sample rows from a live campaign. Shape matches results.parquet. */
export const PARQUET_ROWS = [
  { design_id: "DSN-00412", assay: "SPR_KD",     value: "4.2e-10", censor: "—", flag: "OK",        plate: "P07", run_date: "2026-03-11", instrument: "SPR-02" },
  { design_id: "DSN-00413", assay: "SPR_KD",     value: "1.0e-06", censor: ">", flag: "LOD_UPPER", plate: "P07", run_date: "2026-03-11", instrument: "SPR-02" },
  { design_id: "DSN-00414", assay: "SPR_KD",     value: "—",       censor: "—", flag: "EXPR_FAIL", plate: "P07", run_date: "2026-03-11", instrument: "—" },
  { design_id: "DSN-00415", assay: "NANODSF_TM", value: "71.4",    censor: "—", flag: "OK",        plate: "P07", run_date: "2026-03-12", instrument: "DSF-01" },
  { design_id: "DSN-00415", assay: "ACSINS_DL",  value: "8.3",     censor: "—", flag: "OK",        plate: "P08", run_date: "2026-03-12", instrument: "PLT-04" },
];

export const FLAGGED = new Set(["LOD_UPPER", "EXPR_FAIL"]);

export const LOOP_STEPS = [
  { n: "1", name: "Design", body: "Your model proposes. Sequences, variants, libraries and conditions arrive as a spec — no format wrangling.", chips: ["Sequences", "Variants", "Libraries", "Conditions"] },
  { n: "2", name: "Build",  body: "From a single construct to full libraries included in every campaign, before a single assay runs.", chips: ["HEK293", "CHO", "E. coli", "SEC-HPLC", "CE-SDS", "LC-MS"] },
  { n: "3", name: "Test",   body: "Kinetics, developability, cell-based function and bioprocess — run to the readouts you configured, on named instruments.", chips: ["SPR", "BLI", "nanoDSF", "AC-SINS", "icIEF", "ADCC"] },
  { n: "4", name: "Learn",  body: "Joinable rows land in your model as each run clears QC. Failures returned, limits marked, covariates exposed.", chips: ["Parquet", "REST", "Webhook", "design_id"] },
];

export const CREDIBILITY = [
  { stat: "24 h",    label: "To a scoped quote" },
  { stat: "3–4 wks", label: "Design to measured data" },
  { stat: "100%",    label: "Of designs returned, failures included" },
];

export const RESEARCH_AREAS = [
  "Antibody engineering",
  "Small molecule",
  "Enzyme / protein engineering",
  "Genomics",
  "Cell biology",
  "Other",
];
