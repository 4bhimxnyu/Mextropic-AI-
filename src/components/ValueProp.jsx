import { valueProp } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'
import { useViewport } from '../hooks/useViewport.js'
import { Arrow } from './Nav.jsx'

/** Path B, "Why Mextropic" (560:6). The four-step process as a left-to-right
 *  flowchart with the timing on the connectors. Cards stagger in 80ms apart,
 *  then each connector appears after its card.
 *
 *  Compact: a vertical stepper — number, label, title and the timing between
 *  steps. The descriptions are dropped; the titles carry the story. */
export default function ValueProp() {
  const [ref, inView] = useInView({ threshold: 0.25 })
  const { compact } = useViewport()

  return (
    <section className="section value">
      <div className="wrap">
        <div className="section-head" ref={ref}>
          <p className="eyebrow pill">{valueProp.label}</p>
          <h2 className="h1" style={{ marginTop: 16, maxWidth: 520 }}>{valueProp.title}</h2>
        </div>

        {compact ? (
          <ol className={'stepper' + (inView ? ' is-in' : '')}>
            {valueProp.steps.map((s, i) => (
              <li key={s.n} className="stepper__item" style={{ '--d': i * 80 + 'ms' }}>
                <span className="stepper__n">{s.n}</span>
                <div className="stepper__body">
                  <span className="eyebrow flow__k">{s.k}</span>
                  <h3 className="stepper__t">{s.t}</h3>
                  {i < valueProp.connectors.length && (
                    <span className="stepper__time eyebrow">{valueProp.connectors[i]}</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <ol className={'flow' + (inView ? ' is-in' : '')}>
            {valueProp.steps.map((s, i) => (
              <li key={s.n} className="flow__item">
                <article className="flow__card" style={{ '--d': i * 80 + 'ms' }}>
                  <div className="flow__top">
                    <span className="flow__n">{s.n}</span>
                    <span className="eyebrow flow__k">{s.k}</span>
                  </div>
                  <h3 className="h3">{s.t}</h3>
                  <p className="body">{s.d}</p>
                </article>
                {i < valueProp.connectors.length && (
                  <div className="flow__link" style={{ '--d': i * 80 + 160 + 'ms' }} aria-hidden="true">
                    <span className="flow__line"><Arrow size={14} /></span>
                    <span className="eyebrow flow__time">{valueProp.connectors[i]}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
