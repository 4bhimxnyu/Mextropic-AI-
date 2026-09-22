import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { nav } from '../data/site.js'

/** DESIGN-SPEC.md 6.5 - transparent until 24px of scroll, then fill + hairline +
 *  shadow. The wrapper must not clip: a clipping parent silently caps a child's
 *  shadow.
 *
 *  Below the desktop breakpoint the links collapse behind a toggle next to the
 *  CTA, so the full menu is still reachable on a phone. */
export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const ticking = useRef(false)
  const panel = useRef(null)

  useEffect(() => {
    const update = () => { ticking.current = false; setSolid(window.scrollY > 24) }
    const onScroll = () => {
      if (!ticking.current) { ticking.current = true; requestAnimationFrame(update) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close on Escape, on outside click, and whenever the viewport grows enough
  // that the links are shown inline again - otherwise the panel lingers invisibly
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onDown = (e) => { if (panel.current && !panel.current.contains(e.target)) setOpen(false) }
    const mq = window.matchMedia('(min-width: 1040px)')
    const onWide = () => { if (mq.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    mq.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      mq.removeEventListener('change', onWide)
    }
  }, [open])

  return (
    <header className={'nav' + (solid || open ? ' nav--solid' : '')}>
      <div className="nav__bar" ref={panel}>
        <a className="nav__brand" href="#top"><Logo /> Mextropic</a>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        </nav>

        <span className="nav__spacer" />

        <a className="btn btn--ghost nav__cta" href="#enquiry">Book a call</a>
        <a className="btn btn--primary nav__primary" href="#enquiry">
          <span className="nav__long">Scope your experiment</span>
          <span className="nav__short">Get a quote</span>
        </a>

        <button
          className={'nav__toggle' + (open ? ' is-open' : '')}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <div className={'nav__panel' + (open ? ' is-open' : '')} id="nav-panel">
          <div className="nav__panel-inner">
            {nav.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <a className="nav__panel-cta" href="#enquiry" onClick={() => setOpen(false)}>Book a call</a>
          </div>
        </div>
      </div>
    </header>
  )
}
