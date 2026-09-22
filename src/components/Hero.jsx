import { useEffect, useRef, useState } from 'react'
import { hero } from '../data/site.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/** DESIGN-SPEC.md 6.1 - Blender lab loop, ping-pong, continuous.
 *
 *  The asset is the 6s render plus its own reverse concatenated (11.97s / 718 frames),
 *  so `loop` alone gives a seamless to-and-fro. Reversing in JS by stepping currentTime
 *  backwards means a seek per frame and judders badly at 1718x770/60fps; baking the
 *  reverse into the file lets the decoder play it natively. The duplicate frames at both
 *  turnarounds are dropped in the encode, so neither the hand-over nor the loop stutters.
 *
 *  MP4 before WebM: Safari can pass canPlayType for WebM and still fail to decode. */
export default function Hero() {
  const video = useRef(null)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (reduced) { v.pause(); setPaused(true); return }
    const t = setTimeout(() => {           // start within 0.5s of load
      v.play().catch(() => {})             // autoplay can be refused; poster stands in
    }, 400)
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
      <div className="wrap">
        <div className="hero__copy">
          <span className="hero__pill">
            <b>{hero.pill.tag}</b>
            <span className="hero__pill-text">{hero.pill.text}</span>
          </span>
          <p className="hero__terms">{hero.pill.terms}</p>
          <h1 className="display">{hero.title}</h1>
          <p className="lead hero__dek">{hero.dek}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#enquiry">{hero.primary} &rarr;</a>
            <a className="btn btn--ghost" href="#how">{hero.secondary}</a>
          </div>
        </div>

        <div className="hero__visual">
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
