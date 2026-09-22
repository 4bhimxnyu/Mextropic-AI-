// Copy lifted verbatim from Figma frame "Mextropic — Landing v2".
// Figures marked UNVERIFIED in DESIGN-SPEC.md §8 carry a `note` for the UI.

export const nav = [
  { label: 'Platform', href: '#how' },
  { label: 'Assay Catalogue', href: '#offer' },
  { label: 'How It Works', href: '#how' },
  { label: 'About Us', href: '#footer' },
  { label: 'Resources', href: '#faq' },
];

export const hero = {
  pill: { tag: 'New', text: 'First batch of pilot data is free — eligibility and terms apply' },
  title: 'Experiments in weeks, not months.',
  dek: 'From hypothesis to validated results — Mextropic runs the wet-lab work in the loop, so your team moves at the speed of the model, not the bench.',
  primary: 'Talk to our scientific team',
  secondary: 'See how it works',
};

// Lockups exported from Figma at 3x; w/h are the Figma display sizes.
// Permission from each institution is still outstanding — DESIGN-SPEC.md 8.
export const institutions = [
  { name: 'IIT Madras', src: '/logos/iit-madras.png', w: 219, h: 46 },
  { name: 'Stanford',   src: '/logos/stanford.png',   w: 151, h: 40 },
  { name: 'UCSF',       src: '/logos/ucsf.svg',       w: 62,  h: 30 },
];

export const steps = [
  { n: '01', k: 'Share', t: 'Tell us what you want to test',
    d: 'The hypothesis, the data you need and your timeline. A scientist reads it, not a sales inbox.' },
  { n: '02', k: 'Scope', t: 'A scoped quote in 24 hours',
    d: 'Assays, controls, deliverables, timeline and price — enough to decide without a discovery call.' },
  { n: '03', k: 'Run', t: 'Experiments in our labs',
    d: 'Forward-deployed scientists execute against the agreed controls and QC, on named instruments.' },
  { n: '04', k: 'Deliver', t: 'Data as each run clears QC',
    d: 'Parquet rows streamed per campaign, with failures returned and limits marked — not a final PDF.' },
];

// 12 domains, in Figma document order. `img` is the exported card photo;
// `row` splits them into the two marquee rows the design scrolls in opposite
// directions. The page dek claims 14 domains — see DESIGN-SPEC.md 8.
export const domains = [
  { t: 'Binding Kinetics & Affinity', img: '/domains/binding-kinetics.jpg',           row: 0 },
  { t: 'Biophysical Developability',  img: '/domains/biophysical-developability.jpg', row: 0 },
  { t: 'Cell-Based & Functional',     img: '/domains/cell-based-functional.jpg',      row: 0 },
  { t: 'Bioprocess & Fermentation',   img: '/domains/bioprocess-fermentation.jpg',    row: 0 },
  { t: 'Protein Production',          img: '/domains/protein-production.jpg',         row: 0 },
  { t: 'Hit Identification',          img: '/domains/hit-identification.jpg',         row: 0 },
  { t: 'Synthetic Biology',           img: '/domains/synthetic-biology.jpg',          row: 1 },
  { t: 'Protein Engineering',         img: '/domains/protein-engineering.jpg',        row: 1 },
  { t: 'Proteomics',                  img: '/domains/proteomics.jpg',                 row: 1 },
  { t: 'Metabolomics',                img: '/domains/metabolomics.jpg',               row: 1 },
  { t: 'Genomics & Transcriptomics',  img: '/domains/genomics-transcriptomics.jpg',   row: 1 },
  { t: 'Safety & ADMET',              img: '/domains/safety-admet.jpg',               row: 1 },
]

export const campaign = {
  id: 'MXQ-2026-0417 · Antibody affinity panel',
  nav: ['Overview', 'Samples', 'Runs', 'QC', 'Results', 'Files'],
  active: 'Results',
  kpis: [
    { v: '128', l: 'Samples' },
    { v: '96',  l: 'QC passed' },
    { v: '12',  l: 'Censored' },
    { v: '3',   l: 'Failed' },
  ],
  rows: [
    { id: 'DSN-00412', assay: 'Binding KD',      value: '3.4 nM',   flag: null,         run: 1 },
    { id: 'DSN-00413', assay: 'Binding KD',      value: '> 500 nM', flag: '>',          run: 0.3 },
    { id: 'DSN-00414', assay: 'Expression',      value: '—',        flag: 'EXPR_FAIL',  run: 0.3 },
    { id: 'DSN-00415', assay: 'Binding KD',      value: '12.8 nM',  flag: null,         run: 1 },
    { id: 'DSN-00416', assay: 'Thermostability', value: '61.2 °C',  flag: null,         run: 1 },
  ],
};

export const metrics = [
  { fig: '500+',    label: 'Scientists in our lab network', note: 'Define active, affiliated or accessible' },
  { fig: '79',      label: 'Assay capabilities',            note: 'Confirm count and categorisation' },
  { fig: '24 hrs',  label: 'To a scoped quote',             note: 'Define start point and conditions' },
  { fig: '3–4 wks', label: 'Kickoff to data',               note: 'Clarify assay and study dependencies' },
];

export const faqs = [
  { q: 'Who owns the data and discovery?',
    a: 'The customer owns proprietary discovery. Final IP and legal wording is to be confirmed with counsel before publication.' },
  { q: 'What do you actually return?',
    a: 'Parquet rows per campaign on the schema design_id, assay, value, censor, flag, plate, run_date, instrument. Failures are returned rather than dropped, and values above the limit of detection are marked with a > censor.' },
  { q: 'How fast is a quote?',
    a: 'A scoped quote within 24 hours: assays, controls, deliverables, committed delivery date and price — enough to decide without a discovery call.' },
  { q: 'Can you run assays we design?',
    a: 'Yes. Bring the protocol and the controls; we execute against them on named instruments and return the same schema.' },
  { q: 'How do results reach our pipeline?',
    a: 'Streamed via API as each run clears QC, not delivered as a final PDF at the end of the campaign.' },
];

export const footerCols = [
  { h: 'Explore',   links: ['Platform', 'Assay Catalogue', 'How It Works', 'About Us'] },
  { h: 'Resources', links: ['FAQ', 'Documentation', 'Insights', 'Scope your experiment'] },
  { h: 'Legal',     links: ['Privacy policy', 'Terms of use', 'Data ownership', 'Confidentiality'] },
];

export const contact = ['sayane@mextropic.com', 'pranav@mextropic.com'];

export const office = ['5900 Balcones Drive, STE 100', 'Austin, TX 78731'];
