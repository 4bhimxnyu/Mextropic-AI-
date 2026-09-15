import { Fragment, useEffect, useRef, useState } from "react";
import { LOOP_STEPS, CREDIBILITY } from "../data/catalogue.js";

const R = 185;
const CX = 230;
const NODES = [
  { name: "Design", angle: -Math.PI / 2, place: "top" },
  { name: "Build",  angle: 0,            place: "right" },
  { name: "Test",   angle: Math.PI / 2,  place: "bottom" },
  { name: "Learn",  angle: Math.PI,      place: "left" },
];

function nodeStyle(place) {
  if (place === "top")    return { left: "50%", top: "2%" };
  if (place === "right")  return { left: "96%", top: "50%" };
  if (place === "bottom") return { left: "50%", top: "98%" };
  return { left: "4%", top: "50%" };
}

export default function Loop() {
  const [active, setActive] = useState(1);
  const orbitRef = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const step = LOOP_STEPS[active];

  useEffect(() => {
    const el = orbitRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setDrawn(true)),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec sec-white">
      <div className="wrap">
        <div className="head-centre reveal">
          <h2>
            Validate your designs in <span className="it">3–4 weeks.</span>
          </h2>
          <p className="lead" style={{ maxWidth: 760, marginTop: 18 }}>
            The lab should not be the slowest step in your loop. Models generate candidates faster
            than anyone can evaluate them, we run the other half: expressing, purifying, and testing
            real molecules, then handing the data back.
          </p>
        </div>

        <div className="loop-grid reveal">
          <div>
            <div className={`orbit${drawn ? " in-view" : ""}`} ref={orbitRef}>
              <svg viewBox="0 0 460 460" aria-hidden="true">
                <circle className="track" cx={CX} cy={CX} r={R} />
                <circle className="arc" cx={CX} cy={CX} r={R} transform={`rotate(-90 ${CX} ${CX})`} />
              </svg>

              <div className="orbit-centre">
                <svg width="92" height="92" viewBox="0 0 92 92" fill="none" aria-hidden="true">
                  <path d="M32 9h28M37 17h18M37 46h18M37 75h18M32 83h28" stroke="#9BA3A9" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M30 8C68 28 68 64 30 84" stroke="#191919" strokeWidth="1.6" fill="none" />
                  <path d="M62 8C24 28 24 64 62 84" stroke="#191919" strokeWidth="1.6" fill="none" />
                </svg>
              </div>

              {NODES.map((n, i) => (
                <span key={n.name} className={`orbit-node${i <= active ? " on" : ""}`} style={nodeStyle(n.place)}>
                  {n.name}
                </span>
              ))}
            </div>
            <p className="loop-caption mono">
              Design → Build → Test → Learn — the standard cycle for iterative protein engineering.
            </p>
          </div>

          <div>
            <div className="steps" role="tablist" aria-label="Campaign stages">
              {LOOP_STEPS.map((s, i) => (
                <button
                  key={s.name}
                  className="step"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                >
                  <b>{s.n}</b>
                  {s.name}
                </button>
              ))}
            </div>

            <h3 style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em" }}>{step.name}</h3>
            <p className="lead" style={{ marginTop: 12, fontSize: 18 }}>{step.body}</p>
            <div className="chips mono">
              {step.chips.map((c) => <span key={c}>{c}</span>)}
            </div>
          </div>
        </div>

        <div className="cred reveal">
          <div className="cred-stats">
            {CREDIBILITY.map((c, i) => (
              <Fragment key={c.stat}>
                {i > 0 && <span className="cred-sep" />}
                <div className="cred-stat">
                  <strong>{c.stat}</strong>
                  <span className="mono">{c.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="cred-backing mono">
            Named instruments on every row · Released against QC · Streamed as each run clears · No minimum commitment
          </div>
        </div>
      </div>
    </section>
  );
}
