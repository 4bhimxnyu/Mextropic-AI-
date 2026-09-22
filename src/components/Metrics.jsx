import { useEffect, useState } from 'react'
import { metrics } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/** DESIGN-SPEC.md §6.3 — panel settles first (450ms), then the four columns rise 14px
 *  and fade in on a 90ms stagger, 500ms each, cubic-bezier(0.16, 1, 0.3, 1).
 *
 *  Section carries no top rule (§2): it belongs to the dashboard above it.
 *  Figures are text/primary, never accent — a metric is a heading, not a status (§2). */
export default function Metrics() {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section className="section section--tight-top section--tight-bottom section--no-rule metrics">
      <div className="wrap">
        <div ref={ref} className={'metrics__panel' + (inView ? ' is-in' : '')}>
          <div className="metrics__grid">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={'metric' + (inView ? ' is-in' : '')}
                style={{ '--d': 120 + i * 90 + 'ms' }}
              >
                <div className="metric__fig">
                  <CountUp value={m.fig} run={inView} delay={120 + i * 90} />
                </div>
                <p className="metric__label">{m.label}</p>
                <p className="caption metric__note">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** The count-up Figma cannot do: keyframes interpolate properties, not text (§6.3).
 *  Splits a label like "3–4 wks" into its leading number and its suffix, animates the
 *  number, and leaves everything else alone. */
function CountUp({ value, run, delay = 0, duration = 900 }) {
  const reduced = useReducedMotion()
  const match = /^(\d+)(.*)$/s.exec(value)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''
  const [n, setN] = useState(target)

  useEffect(() => {
    if (target === null || reduced) return
    if (!run) { setN(0); return }

    let raf = 0
    let start = 0
    const ease = (t) => 1 - Math.pow(1 - t, 3)

    const timer = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts
        const t = Math.min(1, (ts - start) / duration)
        setN(Math.round(ease(t) * target))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)

    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [run, target, delay, duration, reduced])

  if (target === null) return <>{value}</>
  return <>{n}{suffix}</>
}
