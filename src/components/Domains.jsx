import { useState } from 'react'
import { domains } from '../data/site.js'
import { useMediaQuery, COMPACT } from '../hooks/useMediaQuery.js'

/** Desktop: two marquee rows scrolling in opposite directions. The Figma file
 *  duplicates each row's cards (" copy") - that duplication IS the loop
 *  mechanism, so one full set can translate out while its copy takes its place.
 *
 *  Compact: a plain list. A horizontally scrolling marquee on a phone fights the
 *  page's own vertical scroll and hides most of the catalogue off-screen, so the
 *  12 domains become 12 readable rows instead. */
export default function Domains({ onAdd, picked = [] }) {
  const compact = useMediaQuery(COMPACT)

  return (
    <section className="section domains" id="offer">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow pill">Assay catalogue</p>
          <h2 className="h1" style={{ marginTop: 16 }}>What we offer.</h2>
          <p className="lead" style={{ maxWidth: 560 }}>
            79 assays across 14 scientific domains - configured as one campaign, returned as one schema.
          </p>
        </div>
      </div>

      {compact
        ? <DomainList onAdd={onAdd} picked={picked} />
        : <DomainMarquee onAdd={onAdd} picked={picked} />}
    </section>
  )
}

/* Twelve rows is a long scroll on a phone, so only the first five show until
   asked for. This component only ever renders in compact mode, so the control
   cannot appear on desktop. */
const PREVIEW = 5

function DomainList({ onAdd, picked }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? domains : domains.slice(0, PREVIEW)
  const rest = domains.length - PREVIEW

  return (
    <div className="wrap">
      <ul className="dlist">
        {shown.map((d) => {
          const on = picked.includes(d.t)
          return (
            <li className="dlist__row" key={d.t}>
              <img className="dlist__thumb" src={d.img} alt="" loading="lazy" decoding="async" />
              <span className="dlist__name">{d.t}</span>
              <a
                className={'dlist__add' + (on ? ' is-picked' : '')}
                href="#enquiry"
                aria-label={(on ? 'Added ' : 'Add ') + d.t}
                onClick={() => onAdd && onAdd(d.t)}
              >
                {on ? 'Added' : 'Add'}
              </a>
            </li>
          )
        })}
      </ul>

      <button
        className="dlist__more"
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? 'Show fewer' : 'See all ' + domains.length + ' domains'}
        <span className="dlist__chev" aria-hidden="true" />
      </button>
      {!expanded && (
        <p className="caption" style={{ marginTop: 10 }}>
          {rest} more domains
        </p>
      )}
    </div>
  )
}

function DomainMarquee({ onAdd, picked }) {
  const rows = [domains.filter((d) => d.row === 0), domains.filter((d) => d.row === 1)]

  return (
    <>
      {rows.map((row, r) => (
        <div className="marquee" key={r}>
          <div className={'marquee__track' + (r === 1 ? ' marquee__track--rev' : '')}>
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
    </>
  )
}
