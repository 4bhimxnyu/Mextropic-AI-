import { clients } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'

/** "Teams we work with" (561:893 / 560:71). Logos and testimonials are dashed
 *  placeholders until engagements confirm (~Nov 2026). Path A has no logo row
 *  (founders' round-3 feedback); Path B keeps its five slots. */
export default function Clients({ logos = true }) {
  const [ref, inView] = useInView({ threshold: 0.2 })

  return (
    <section className="section clients">
      <div className="wrap" ref={ref}>
        <div className="section-head section-head--centre">
          <p className="eyebrow pill">{clients.label}</p>
          <h2 className="h1">{clients.title}</h2>
          <p className="caption">{clients.note}</p>
        </div>

        {logos && (
          <ul className="logo-slots" aria-label="Client logos, pending">
            {[1, 2, 3, 4, 5].map((n) => (
              <li key={n} className={'logo-slot reveal' + (inView ? ' is-in' : '')} style={{ '--d': n * 60 + 'ms' }}>
                <span className="eyebrow">Client logo</span>
              </li>
            ))}
          </ul>
        )}

        <div className="quotes">
          {clients.testimonials.map((t, i) => (
            <figure key={i} className={'quote reveal' + (inView ? ' is-in' : '')} style={{ '--d': (logos ? 360 : 0) + i * 120 + 'ms' }}>
              <span className="quote__mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="quote__text">{t.quote}</blockquote>
              <figcaption className="quote__who">
                <span className="quote__avatar" aria-hidden="true" />
                <span>
                  <span className="small medium" style={{ color: 'var(--text-primary)', display: 'block' }}>{t.who}</span>
                  <span className="caption">{t.org}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
