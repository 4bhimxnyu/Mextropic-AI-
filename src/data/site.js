// Copy lifted from Figma page "iteration 6 — two paths" (556:6): frames
// "Landing — 00 Entry" (561:2826), "01 Path A · Multiomics data" (561:6) and
// "02 Path B · Discovery to IND" (556:7). Anything not in the file is marked
// BUILD-COPY so the founders can replace it.

export const nav = [
  { label: 'Multiomics Data',  path: 'data' },
  { label: 'Discovery to IND', path: 'ind' },
  { label: 'About',            href: '#footer' },
]

export const hero = {
  pill: { tag: 'New', text: 'First batch of pilot data is free', terms: 'Eligibility and terms apply.' },
  title: ['Autonomous preclinical experiments.', 'In weeks.'],
  dek: 'Mextropic runs the wet-lab work in the loop, from paired multiomics datasets to IND-enabling studies, so your team moves at the speed of the model.',
  primary: 'Talk to our scientific team',
  secondary: 'Explore services',
}

export const institutions = [
  { name: 'IIT Madras', src: '/logos/iit-madras.png', w: 219, h: 46 },
  { name: 'Stanford',   src: '/logos/stanford.png',   w: 151, h: 40 },
  { name: 'UCSF',       src: '/logos/ucsf.svg',       w: 62,  h: 30 },
]

export const chooser = {
  label: 'Explore services',
  title: 'What are you here for?',
  dek: 'Mextropic specializes in both procuring multimodal experimental data and running experiments for faster drug discovery.',
  cards: [
    {
      path: 'data', n: '01', icon: 'grid',
      title: 'I’m looking for multiomics / multimodal experimental data',
      bullets: [
        'Paired per sample, across every modality',
        'Bespoke perturbation, dose and time-course designs',
        'Parquet rows streamed as each run clears QC',
      ],
    },
    {
      path: 'ind', n: '02', icon: 'flask',
      title: 'I’m looking for experimental validation from discovery to IND',
      bullets: [
        'Hit-to-lead: binding kinetics, biophysics, cell-based',
        'Lead-to-IND: safety & ADME, PK/PD, efficacy models',
        'One dashboard from first assay to IND-ready data',
      ],
    },
  ],
  cta: 'Explore',
  helper: { label: 'Not sure?', link: 'Talk to our team' },
}

/* ---------------------------------------------------------------- Path A */
export const offerData = {
  label: 'What we offer',
  title: 'Paired multimodal datasets, generated for model improvement.',
  intro: [
    'Mextropic AI sources biological samples and procures multi-omics data.',
    'We also conduct experiments across biological systems. Our work spans genomics, transcriptomics, proteomics, and cellular and functional readouts, bringing together molecular measurements and the context needed to interpret them.',
  ],
  // Row 0: modalities. Row 1: paired experiment designs. Images are the
  // iteration-5 renders the Figma cards reuse (matched by image hash).
  cards: [
    { t: 'Genomics & Transcriptomics',  img: '/domains/genomics-transcriptomics.jpg',   row: 0 },
    { t: 'Proteomics',                  img: '/domains/proteomics.jpg',                 row: 0 },
    { t: 'Metabolomics',                img: '/domains/metabolomics.jpg',               row: 0 },
    { t: 'Imaging & Microscopy',        img: '/domains/bioprocess-fermentation.jpg',    row: 0 },
    { t: 'Cell-Based & Functional',     img: '/domains/cell-based-functional.jpg',      row: 0 },
    { t: 'Biophysical & Structural',    img: '/domains/biophysical-developability.jpg', row: 0 },
    { t: 'Perturbation Panels',         img: '/domains/synthetic-biology.jpg',          row: 1 },
    { t: 'Dose–Response Series',   img: '/domains/hit-identification.jpg',         row: 1 },
    { t: 'Expression & Purification',   img: '/domains/protein-production.jpg',         row: 1 },
    { t: 'Binding & Affinity Readouts', img: '/domains/binding-kinetics.jpg',           row: 1 },
    { t: 'Epigenomics & Single-Cell',   img: '/domains/protein-engineering.jpg',        row: 1 },
    { t: 'Safety & Tox Readouts',       img: '/domains/safety-admet.jpg',               row: 1 },
  ],
  bespoke: { label: 'Bespoke experimentation', title: 'Don’t see the dataset? Design it.', cta: 'Design an experiment' },
}

export const metricsData = [
  { fig: '500+',         label: 'Scientists in our lab network' },
  { fig: '14',           label: 'Modalities and domains, paired' },
  { fig: '24 hrs',       label: 'To a scoped dataset quote' },
  { fig: '3–4 wks', label: 'Kickoff to first rows' },
]

/* ---------------------------------------------------------------- Path B */
export const offerTracks = {
  label: 'What we offer',
  title: 'From hit to IND, under one roof.',
  phases: ['Hit identification', 'Hit-to-lead', 'Lead optimisation', 'IND-enabling'],
  tracks: [
    {
      bracket: 'Phases 1–2',
      title: 'Find and validate the hits worth optimising.',
      dek: 'Binding, biophysics and cell-based readouts on named instruments.',
      assays: [
        ['Hit identification',               'HTS · Fragment · DEL follow-up'],
        ['Binding kinetics & affinity',       'SPR · BLI · ITC'],
        ['Biophysical developability',        'Tm · Aggregation · Viscosity'],
        ['Cell-based & functional',           'Dose-response · IC50 / EC50'],
        ['Protein production & engineering',  'Expression · Purification · QC'],
        ['Synthetic biology',                 'Constructs · Strain builds'],
      ],
    },
    {
      bracket: 'Phases 3–4',
      title: 'Carry the lead to an IND-ready package.',
      dek: 'Safety, ADME, PK/PD and efficacy models run under one campaign.',
      assays: [
        ['Safety & ADMET',                    'ADME · CYP · hERG · Cytotox · Genotox'],
        ['PK / PD & bioanalysis',             'LC-MS/MS · Exposure · Biomarkers'],
        ['Selectivity & off-target panels',   'Kinome · Receptor panels'],
        ['Efficacy models',                   'In vitro · In vivo pharmacology'],
        ['Bioprocess & fermentation',         'Tox & GLP batches · Scale-up'],
        ['IND-enabling study design',         'GLP tox · CRO coordination'],
      ],
    },
  ],
  footer: 'Typical cycle · 3–4 wks · Scoped in 24 h',
  cta: 'Scope this track',
}

export const valueProp = {
  label: 'Why Mextropic',
  title: '500+ scientists. One data stream.',
  steps: [
    { n: '01', k: 'Share',   t: 'Tell us what you want to test',
      d: 'The hypothesis, the data you need and your timeline. A scientist reads it.' },
    { n: '02', k: 'Scope',   t: 'A scoped quote in 24 hours',
      d: 'Assays, controls, deliverables, timeline and price.' },
    { n: '03', k: 'Run',     t: 'Experiments in our labs',
      d: 'Forward-deployed scientists execute against the agreed controls and QC, on named instruments.' },
    { n: '04', k: 'Deliver', t: 'Data as each run clears QC',
      d: 'Parquet rows streamed per campaign, with failures returned and limits marked.' },
  ],
  connectors: ['24 h', 'Kickoff', '3–4 wks'],
}

export const metricsInd = [
  { fig: '500+',         label: 'Scientists in our lab network' },
  { fig: '79',           label: 'Assay capabilities' },
  { fig: '24 hrs',       label: 'To a scoped quote' },
  { fig: '3–4 wks', label: 'Kickoff to data' },
]

export const dashboard = {
  label: 'Dashboard',
  title: 'See every run, live — from first assay to IND.',
  dek: 'Samples, QC and results land as each run clears — one campaign ID, one schema, failures included.',
  campaign: {
    id: 'MXQ-2026-0417 · Antibody affinity panel',
    nav: ['Overview', 'Samples', 'Runs', 'QC', 'Results', 'Files'],
    active: 'Results',
    kpis: [
      { v: '128', l: 'Samples' },
      { v: '96',  l: 'QC passed' },
      { v: '12',  l: 'Censored' },
      { v: '3',   l: 'Failed' },
    ],
    chart: 'Binding response · run 04',
    rows: [
      { id: 'DSN-00412', assay: 'Binding KD',      value: '3.4 nM',   flag: null,        run: 1 },
      { id: 'DSN-00413', assay: 'Binding KD',      value: '> 500 nM', flag: '>',         run: 0.3 },
      { id: 'DSN-00414', assay: 'Expression',      value: '—',   flag: 'EXPR_FAIL', run: 0.3 },
      { id: 'DSN-00415', assay: 'Binding KD',      value: '12.8 nM',  flag: null,        run: 1 },
      { id: 'DSN-00416', assay: 'Thermostability', value: '61.2 °C', flag: null,    run: 1 },
    ],
  },
}

/* ---------------------------------------------------------------- shared tail */
export const clients = {
  label: 'Clients',
  title: 'Teams we work with.',
  note: 'Logos and testimonials are added as engagements confirm.',
  testimonials: [
    { quote: 'Quote from a client scientist about turnaround, data quality or the live dashboard goes here — two to three sentences, in their words.', who: 'Name, Title', org: 'Company · pending approval' },
    { quote: 'Quote from a client scientist about turnaround, data quality or the live dashboard goes here — two to three sentences, in their words.', who: 'Name, Title', org: 'Company · pending approval' },
  ],
}

export const enquiry = {
  data: {
    title: 'Let’s scope your first dataset.',
    typeLabel: 'Modalities needed',
    types: ['Genomics / transcriptomics', 'Proteomics', 'Metabolomics', 'Imaging', 'Bespoke experiment', 'Several of these'],
    typeHint: 'Genomics · Proteomics · Imaging · Bespoke',
    readoutsLabel: 'Schema or target dataset size',
    readoutsHint: 'e.g. 2,000 paired samples · Parquet · per-run provenance',
  },
  ind: {
    title: 'Let’s scope your first experiment.',
    typeLabel: 'Experiment type / target',
    types: ['Antibody engineering', 'Small molecule', 'Genomics', 'Other'],
    typeHint: 'Antibody engineering · Small molecule · Genomics',
    readoutsLabel: 'Desired data or readouts',
    readoutsHint: 'IC50 curves, sequence-verified clones, RNA-seq counts…',
  },
  none: {
    title: 'Let’s scope your first experiment.',
    typeLabel: 'What do you need?',
    types: ['Multiomics / multimodal data', 'Hit-to-lead validation', 'Lead-to-IND studies', 'Not sure yet'],
    typeHint: 'Multiomics data · Hit-to-lead · Lead-to-IND',
    readoutsLabel: 'Desired data or readouts',
    readoutsHint: 'IC50 curves, paired omics, RNA-seq counts…',
  },
  dek: 'Share the hypothesis, the data you need and your timeline. We define a focused pilot — assays, controls, deliverables, timeline and pricing — and deliver your first batch free.',
  consent: 'I agree to be contacted about this enquiry.',
  note: 'A scientist reads every message',
}

// Only the first answer exists in Figma. The other three are BUILD-COPY,
// written to match the page's own claims, for the founders to approve.
const faqShared = [
  { q: 'Who owns the data and discovery?',
    a: 'The customer owns proprietary discovery. Final IP and legal wording is pending review and approval.' },
  { q: 'Which path should I choose?',
    a: 'If you need experimental data to train or validate a model, choose multiomics data. If you have a molecule and need wet-lab evidence towards an IND, choose discovery to IND. Both run through the same scientists and the same data stream, and you can switch at any time.' },
  { q: 'What is the typical turnaround?',
    a: 'A scoped quote within 24 hours of your brief. Most campaigns go from kickoff to first rows in three to four weeks, and results stream as each run clears QC rather than arriving as one report at the end.' },
]
export const faqs = {
  data: [...faqShared, {
    q: 'Can you generate modalities not listed?',
    a: 'Yes. Tell us the biology and the schema you need and a scientist will design the run. Every readout stays paired to the same sample ID, so new modalities slot into the dataset you already have.' }],
  ind: [...faqShared, {
    q: 'Do you only run the assays listed?',
    a: 'No. The catalogue is where most campaigns start, but bring your own protocol and controls and we will run it on named instruments and return it in the same schema.' }],
}

export const footerCols = [
  { h: 'Explore', links: [
    { label: 'Multiomics Data',       path: 'data' },
    { label: 'Discovery to IND',      path: 'ind' },
    { label: 'About Us',              href: '#footer' },
    { label: 'FAQ',                   href: '#faq' },
    { label: 'Scope your experiment', form: true },
  ] },
  { h: 'Legal', links: [
    { label: 'Privacy policy',  href: '#' },
    { label: 'Terms of use',    href: '#' },
    { label: 'Data ownership',  href: '#' },
    { label: 'Confidentiality', href: '#' },
  ] },
]

export const contact = ['sayane@mextropic.com', 'pranav@mextropic.com']
