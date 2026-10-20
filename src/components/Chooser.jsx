import { chooser, contact } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'
import { useViewport } from '../hooks/useViewport.js'
import { Arrow } from './Nav.jsx'

/** Figma "Explore services" (561:3076). Both cards are identical in size, weight
 *  and colour; selection is the only state that changes — a 2px accent ring on
 *  the chosen card and 62% opacity on the other.
 *
 *  Compact: the two cards become two tappable rows — icon, title, arrow. The
 *  bullets are the first thing a phone does not need; the path content that
 *  follows says the same things at full size. */
export default function Chooser({ path, onChoose, onForm }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const { compact } = useViewport()

  return (
    <section className="section chooser" id="explore">
      <div className="wrap">
        <div className="section-head section-head--centre">
          <p className="eyebrow pill">{chooser.label}</p>
          <h2 className="h1">{chooser.title}</h2>
          {!compact && <p className="lead lead--lg" style={{ maxWidth: 680 }}>{chooser.dek}</p>}
        </div>

        <div className={'pcards' + (compact ? ' pcards--compact' : '')} ref={ref}>
          {chooser.cards.map((c, i) => {
            const selected = path === c.path
            const dimmed = path && !selected
            return (
              <article
                key={c.path}
                className={
                  'pcard reveal' +
                  (inView ? ' is-in' : '') +
                  (selected ? ' is-selected' : '') +
                  (dimmed ? ' is-dim' : '')
                }
                style={{ '--d': i * 90 + 'ms' }}
                aria-current={selected ? 'true' : undefined}
                onClick={() => onChoose(c.path)}
              >
                <div className="pcard__top">
                  <span className="pcard__icon" aria-hidden="true"><Icon kind={c.icon} /></span>
                  {!selected && !compact && <span className="eyebrow">Path {c.n}</span>}
                  {compact && (
                    <span className="pcard__go" aria-hidden="true">
                      {selected ? <Check /> : <Arrow size={14} />}
                    </span>
                  )}
                </div>
                <h3 className="pcard__title">{c.title}</h3>
                {!compact && (
                  <>
                    <span className="pcard__rule" />
                    <ul className="pcard__list">
                      {c.bullets.map((b) => <li key={b}><Check />{b}</li>)}
                    </ul>
                    <div className="pcard__cta">
                      <a
                        className="btn btn--primary"
                        href={'?path=' + c.path}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChoose(c.path) }}
                      >
                        {chooser.cta} <Arrow />
                      </a>
                    </div>
                  </>
                )}
                {compact && (
                  <a
                    className="pcard__cover"
                    href={'?path=' + c.path}
                    aria-label={chooser.cta + ': ' + c.title}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChoose(c.path) }}
                  />
                )}
              </article>
            )
          })}
        </div>

        <p className="chooser__helper">
          <span className="eyebrow">{chooser.helper.label}</span>
          {path
            ? <a className="link" href="#enquiry" onClick={(e) => { e.preventDefault(); onForm() }}>{chooser.helper.link} <Arrow /></a>
            : <a className="link" href={'mailto:' + contact.join(',')}>{chooser.helper.link} <Arrow /></a>}
        </p>
      </div>
    </section>
  )
}

function Icon({ kind }) {
  if (kind === 'flask') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7.5 2.5h5M8.5 2.5v5.2L3.6 15.4A1.6 1.6 0 0 0 5 17.8h10a1.6 1.6 0 0 0 1.4-2.4L11.5 7.7V2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12.5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M14.5 11.5v6M11.5 14.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function Check() {
  return (
    <svg className="check" width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="7.75" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 8.7l2.3 2.3 4.2-4.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
