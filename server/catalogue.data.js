/* Server-side copy of the catalogue so the API has no client dependency.
   Derived from mextropic-demo-v3.html — 6 core categories + 14 extended domains. */
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
