import { useEffect, useRef, useState } from 'react'
import { hero } from '../data/site.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { Arrow } from './Nav.jsx'

/** The lab loop stays until the VIT lab footage arrives (Figma badge
 *  "VIDEO · VIT LAB FOOTAGE PENDING"). Same ping-pong asset as v2: the render
 *  plus its own reverse baked into one file, so `loop` alone is seamless.
 *  MP4 before WebM — Safari can pass canPlayType for WebM and still fail. */
export default function Hero({ onForm }) {
  const video = useRef(null)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (reduced) { v.pause(); setPaused(true); return }
    const t = setTimeout(() => { v.play().catch(() => {}) }, 400)
    return () => clearTimeout(t)
  }, [reduced])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) { v.play().catch(() => {}); setPaused(false) }
    else { v.pause(); setPaused(true) }
  }

  return (
    <section className="section hero" id="top">
      <div className="hero__grid" aria-hidden="true" />
      <div className="wrap">
        <div className="hero__copy">
          <span className="hero__pill rise" style={{ '--d': '0ms' }}>
            <b>{hero.pill.tag}</b>
            <span className="hero__pill-text">{hero.pill.text}</span>
          </span>
          <p className="hero__terms rise" style={{ '--d': '40ms' }}>{hero.pill.terms}</p>
          <h1 className="display rise" style={{ '--d': '80ms' }}>
            {hero.title[0]}<br />{hero.title[1]}
          </h1>
          <p className="lead hero__dek rise" style={{ '--d': '160ms' }}>{hero.dek}</p>
          <div className="hero__actions rise" style={{ '--d': '240ms' }}>
            <a className="btn btn--primary" href="#enquiry" onClick={(e) => { e.preventDefault(); onForm() }}>
              {hero.primary} <Arrow />
            </a>
            <a className="btn btn--ghost" href="#explore">{hero.secondary}</a>
          </div>
        </div>

        <div className="hero__visual rise" style={{ '--d': '320ms' }}>
          <video
            ref={video}
            className="hero__video"
            poster="/hero-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Automated lab bench filling a 96-well plate"
          >
            <source src="/hero-lab-loop.mp4" type="video/mp4" />
            <source src="/hero-lab-loop.webm" type="video/webm" />
          </video>
          {/* WCAG 2.2.2: looping motion over 5s needs a pause control */}
          <button className="hero__pause" onClick={toggle} type="button">
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </section>
  )
}
