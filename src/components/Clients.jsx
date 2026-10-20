import { clients } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'
import { useViewport } from '../hooks/useViewport.js'

/** "Teams we work with" (561:893 / 560:71). Testimonials are dashed
 *  placeholders until engagements confirm. No logo row on either path; logos
 *  come back here once clients are confirmed.
 *
 *  Compact: one testimonial. */
export default function Clients() {
  const [ref, inView] = useInView({ threshold: 0.2 })
  const { compact } = useViewport()
  const quotes = compact ? clients.testimonials.slice(0, 1) : clients.testimonials

  return (
    <section className="section clients">
      <div className="wrap" ref={ref}>
        <div className="section-head section-head--centre">
          <p className="eyebrow pill">{clients.label}</p>
          <h2 className="h1">{clients.title}</h2>
          <p className="caption">{clients.note}</p>
        </div>


        <div className="quotes">
          {quotes.map((t, i) => (
            <figure key={i} className={'quote reveal' + (inView ? ' is-in' : '')} style={{ '--d': i * 120 + 'ms' }}>
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
