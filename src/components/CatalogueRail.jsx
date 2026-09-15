import { useEffect, useRef, useState } from "react";
import { CATALOGUE, GRADIENTS } from "../data/catalogue.js";
import Motif from "./Motif.jsx";

const GLYPH = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="4" cy="4" r="1.7" fill="#fff" />
    <circle cx="10" cy="4" r="1.7" fill="#fff" />
    <circle cx="4" cy="10" r="1.7" fill="#fff" />
    <circle cx="10" cy="10" r="1.7" fill="#fff" />
  </svg>
);

function Card({ item, onAdd }) {
  const [a, b] = GRADIENTS[item.fam];
  return (
    <article className="ccard" style={{ background: `linear-gradient(180deg, ${a}, ${b})` }}>
      <Motif kind={item.motif} />
      <span className="scrim" />
      <span className="glyph">{GLYPH}</span>
      <div className="cbody">
        <h4>{item.title}</h4>
        <div className="cmeta mono">{item.meta}</div>
        <button className="cbtn" onClick={() => onAdd(item)}>Add to campaign</button>
      </div>
    </article>
  );
}

export default function CatalogueRail({ onAdd }) {
  const [items, setItems] = useState(CATALOGUE);
  const railA = useRef(null);
  const railB = useRef(null);
  const offset = useRef(0);

  useEffect(() => {
    let alive = true;
    fetch("/api/catalogue")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d?.items?.length) setItems(d.items); })
      .catch(() => { /* bundled catalogue stands in */ });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    // don't burn frames animating a rail nobody is looking at
    const onVis = () => {
      [railA.current, railB.current].forEach((r) => r?.classList.toggle("stopped", document.hidden));
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const nudge = (dir) => {
    offset.current += dir * 6;
    [railA.current, railB.current].forEach((r) => {
      if (r) r.style.animationDelay = `${offset.current}s`;
    });
  };

  const rowA = items.slice(0, Math.ceil(items.length / 2));
  const rowB = items.slice(Math.ceil(items.length / 2));

  return (
    <section className="sec sec-ground" id="catalogue" style={{ overflow: "hidden" }}>
      <div className="wrap rail-head reveal">
        <h2>Unlock breakthroughs<br />at scale.</h2>
        <div style={{ maxWidth: 430 }}>
          <p className="lead" style={{ fontSize: 18 }}>
            From expression and binding through ADMET, proteomics and genomics. 79 assays across 14
            scientific domains — configured as one campaign, returned as one schema.
          </p>
          <div className="rail-ctrls" style={{ display: "flex", gap: 10, marginTop: 26 }}>
            <button className="btn btn-ghost-light" aria-label="Previous" onClick={() => nudge(1)}
              style={{ width: 44, height: 44, padding: 0, border: "1px solid var(--line)", background: "var(--surface)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4.5 6.5 9 11 13.5" stroke="#4A5259" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="btn btn-ghost-light" aria-label="Next" onClick={() => nudge(-1)}
              style={{ width: 44, height: 44, padding: 0, border: "1px solid var(--line)", background: "var(--surface)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4.5 11.5 9 7 13.5" stroke="#4A5259" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="rails">
        <div className="rail-wrap">
          {/* rendered twice so translateX(-50%) loops seamlessly */}
          <div className="rail" ref={railA} style={{ "--dur": "72s" }}>
            {[...rowA, ...rowA].map((item, i) => <Card key={`a-${i}`} item={item} onAdd={onAdd} />)}
          </div>
        </div>
        <div className="rail-wrap">
          <div className="rail rev" ref={railB} style={{ "--dur": "86s" }}>
            {[...rowB, ...rowB].map((item, i) => <Card key={`b-${i}`} item={item} onAdd={onAdd} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
