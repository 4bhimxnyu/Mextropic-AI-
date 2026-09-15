import { useState } from "react";

/* Placeholder content. Do not ship: the portrait is an unlicensed archival
   photograph and the quote is sample copy, not an approved customer statement. */
const QUOTES = [
  {
    body:
      "We stopped losing weeks to the hand-off. Designs go out on a Monday and come back as rows we can train on — including the ones that failed, which is the part we actually needed.",
    name: "[ Name ]",
    role: "[ Title ] · [ Organisation ]",
  },
];

export default function Testimonial() {
  const [i, setI] = useState(0);
  const q = QUOTES[i];

  return (
    <section className="sec sec-white">
      <div className="wrap">
        <div className="rail-head reveal">
          <h2>Why research teams<br />work with Mextropic.</h2>
          <p className="lead" style={{ maxWidth: 400, fontSize: 18 }}>
            Every campaign runs on the same contract: a scoped quote in a day, named instruments on
            every row, and measured data, failures included, streamed back as it clears QC.
          </p>
        </div>

        <div className="tcard reveal">
          <div className="quote">
            <div>
              <span className="ph mono">◆ Sample copy — replace with a real, approved quote</span>
              <blockquote>“{q.body}”</blockquote>
              <div className="who">
                <b>{q.name}</b>
                <span>{q.role}</span>
              </div>
            </div>
            <div>
              <div className="logo mono">Client logo</div>
              <div className="tdots">
                {QUOTES.concat([{}, {}]).slice(0, 3).map((_, n) => (
                  <button
                    key={n}
                    className={n === i ? "on" : ""}
                    aria-label={`Quote ${n + 1}`}
                    onClick={() => setI(n < QUOTES.length ? n : i)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="tphoto">
            <img src="/testimonial.jpg" alt="Gloved hands pipetting a sample into a plate rack in a clean room" />
          </div>
        </div>
      </div>
    </section>
  );
}
