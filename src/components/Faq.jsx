import { useState } from 'react'

const DEFAULT_OPEN = 0

/** Hover opens that question; when nothing is hovered the default one returns.
 *  Click still latches, so touch and keyboard users are not left out. */
export default function Faq({ items }) {
  const [hovered, setHovered] = useState(null)
  const [pinned, setPinned] = useState(DEFAULT_OPEN)
  const open = hovered !== null ? hovered : pinned

  return (
    <section className="section faq" id="faq">
      <div className="wrap split">
        <div className="section-head" style={{ marginBottom: 0, alignContent: 'start' }}>
          <p className="eyebrow pill">FAQ</p>
          <h2 className="h2" style={{ marginTop: 16 }}>Common questions.</h2>
          <p className="body" style={{ maxWidth: 380 }}>
            Anything unanswered here goes straight to a scientist, not a sales inbox.
          </p>
        </div>

        <div className="faq__list" onMouseLeave={() => setHovered(null)}>
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                className={'faq__item' + (isOpen ? ' is-open' : '')}
                key={f.q}
                onMouseEnter={() => setHovered(i)}
              >
                <button
                  className="faq__q"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={'faq-a-' + i}
                  onClick={() => setPinned(isOpen && pinned === i ? -1 : i)}
                  onFocus={() => setHovered(i)}
                >
                  <span>{f.q}</span>
                  <span className="faq__sign" aria-hidden="true" />
                </button>
                <div className={'faq__a' + (isOpen ? ' is-open' : '')} id={'faq-a-' + i} role="region">
                  <div><p className="body">{f.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
