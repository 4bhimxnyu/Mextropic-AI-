import { useState } from 'react'
import { offerData } from '../data/site.js'
import { useViewport } from '../hooks/useViewport.js'
import { useInView } from '../hooks/useInView.js'
import { Arrow } from './Nav.jsx'

/** Path A, "What we offer — paired modalities" (561:330). The iteration-5 card
 *  rail: two marquee rows in opposite directions, ADD TO CAMPAIGN on each card.
 *  Row 0 is modalities, row 1 paired experiment designs.
 *
 *  Compact: one paragraph of intro, and the cards as a short list with the
 *  rest behind "See all". A horizontal marquee on a phone fights the page's
 *  own scroll and hides most of the catalogue off-screen. */
export default function OfferData({ onAdd, picked = [], onForm }) {
  const { compact } = useViewport()
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <section className="section offer offer--data" id="offer">
      <div className="wrap">
        <div className="split-head" ref={ref}>
          <div className={'reveal' + (inView ? ' is-in' : '')}>
            <p className="eyebrow pill">{offerData.label}</p>
            <h2 className="h1" style={{ marginTop: 16, maxWidth: 560 }}>{offerData.title}</h2>
          </div>
          <div className={'split-head__right reveal' + (inView ? ' is-in' : '')} style={{ '--d': '120ms' }}>
            {(compact ? offerData.intro.slice(0, 1) : offerData.intro).map((p) => (
              <p className="lead lead--lg" key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {compact
        ? <CardList onAdd={onAdd} picked={picked} />
        : <CardMarquee onAdd={onAdd} picked={picked} />}

      <div className="wrap">
        <div className="bespoke">
          <div>
            <p className="eyebrow bespoke__label">{offerData.bespoke.label}</p>
            <h3 className="h2 bespoke__title">{offerData.bespoke.title}</h3>
          </div>
          <a className="btn btn--primary" href="#enquiry" onClick={(e) => { e.preventDefault(); onForm() }}>
            {offerData.bespoke.cta} <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}

const PREVIEW = 4

function CardList({ onAdd, picked }) {
  const [expanded, setExpanded] = useState(false)
  const all = offerData.cards
  const shown = expanded ? all : all.slice(0, PREVIEW)

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
        {expanded ? 'Show fewer' : 'See all ' + all.length}
        <span className="dlist__chev" aria-hidden="true" />
      </button>
    </div>
  )
}

function CardMarquee({ onAdd, picked }) {
  const rows = [offerData.cards.filter((d) => d.row === 0), offerData.cards.filter((d) => d.row === 1)]

  return (
    <div className="rail">
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
    </div>
  )
}
