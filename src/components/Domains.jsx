import { domains } from '../data/site.js'

/** Figma "Domain rows": two rows that scroll continuously in opposite directions.
 *  Each row's children are duplicated in the file (…" · copy") — that duplication
 *  is what makes a marquee loop seamlessly: translate one full set width, then the
 *  copy is exactly where the original was, so the reset is invisible.
 *
 *  Card = photo + #111c33@34% tint + bottom scrim, grip top-left, footer bottom (spec §5). */
export default function Domains({ onAdd, picked = [] }) {
  const rows = [domains.filter((d) => d.row === 0), domains.filter((d) => d.row === 1)]

  return (
    <section className="section domains" id="offer">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow pill">Assay catalogue</p>
          <h2 className="h1" style={{ marginTop: 16 }}>What we offer.</h2>
          <p className="lead" style={{ maxWidth: 560 }}>
            79 assays across 14 scientific domains — configured as one campaign, returned as one schema.
          </p>
        </div>
      </div>

      {rows.map((row, r) => (
        <div className="marquee" key={r}>
          <div className={'marquee__track' + (r === 1 ? ' marquee__track--rev' : '')}>
            {/* two identical sets: the second covers the seam as the first scrolls out */}
            {[0, 1].map((dup) => (
              <div className="marquee__set" key={dup} aria-hidden={dup === 1 ? 'true' : undefined}>
                {row.map((d) => (
                  <article className="card" key={d.t + dup}>
                    <img className="card__img" src={d.img} alt="" loading="lazy" decoding="async" />
                    <span className="card__tint" />
                    <span className="card__scrim" />
                    <span className="card__grip" />
                    <div className="card__body">
                      <h3 className="card__title">{d.t}</h3>
                      <a
                        className={'btn btn--card' + (picked.includes(d.t) ? ' is-picked' : '')}
                        href="#enquiry"
                        tabIndex={dup === 1 ? -1 : 0}
                        onClick={() => onAdd && onAdd(d.t)}
                      >
                        {picked.includes(d.t) ? 'Added ✓' : 'Add to campaign'}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

    </section>
  )
}
