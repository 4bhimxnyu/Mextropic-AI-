import { steps } from '../data/site.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { useMediaQuery, COMPACT } from '../hooks/useMediaQuery.js'

/* Figma "Tick ring" (304:6): 72 ticks, 5×46px, one every 5°, inner radius 150,
   outer 196. On compact screens the same ticks lay out as a flat bar instead —
   a 392px ring cannot fit a 375px viewport, and shrinking it makes the centre
   label unreadable.

   The per-tick angle is published as a CSS custom property rather than baked
   into an inline transform, so the stylesheet owns the geometry and can switch
   between radial and flat without React re-rendering 72 nodes. */
const TICKS = 72

export default function HowItWorks() {
  const [ref, active] = useScrollProgress(4)
  const compact = useMediaQuery(COMPACT)
  const lit = Math.round((active / 4) * TICKS)

  return (
    <section className="section" id="how" ref={ref}>
      <div className="wrap how">
        <div className="how__left">
          <p className="eyebrow pill">How it works</p>
          <h2 className="h1" style={{ marginTop: 16 }}>Four steps to data.</h2>

          <div
            className={'dial' + (compact ? ' dial--flat' : '')}
            role="img"
            aria-label={'Pilot cycle progress ' + active * 25 + ' percent'}
          >
            <div className="dial__ring">
              {Array.from({ length: TICKS }, (_, i) => (
                <span
                  key={i}
                  className="dial__tick"
                  style={{
                    '--i': i,
                    background: i < lit ? tickColour(i) : 'var(--border-default)',
                    transitionDelay: (i % 18) * 12 + 'ms',
                  }}
                />
              ))}
              <div className="dial__centre">
                <p className="dial__label">Pilot cycle</p>
                <p className="dial__pct">{active * 25}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="how__right">
          <p className="lead how__dek">
            One scoped pilot, one set of deliverables, and a number within 24 hours.
          </p>

          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.n} className={'step' + (i < active ? ' is-active' : '')}>
                <div className="step__head">
                  <span className="step__n">{s.n}</span>
                  <span className="step__k">{s.k}</span>
                </div>
                <div className="step__body">
                  <h3 className="step__t">{s.t}</h3>
                  <p className="body step__d">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* The ring sweeps blue → violet → orange → violet → blue across its 72 ticks,
   matching the fills keyframes on Tick/01…Tick/72 (DESIGN-SPEC.md §6.2). */
function tickColour(i) {
  const stops = ['#2b56d1', '#7d67b3', '#f77f67', '#7866b6', '#2b56d1']
  const t = (i / (TICKS - 1)) * (stops.length - 1)
  const a = stops[Math.floor(t)]
  const b = stops[Math.min(stops.length - 1, Math.ceil(t))]
  return mix(a, b, t - Math.floor(t))
}

function mix(a, b, k) {
  const parse = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const A = parse(a)
  const B = parse(b)
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join('')
}
