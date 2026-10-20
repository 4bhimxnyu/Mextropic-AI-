import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { nav } from '../data/site.js'

/** Transparent until 24px of scroll, then fill + hairline + shadow. The wrapper
 *  must not clip: a clipping parent silently caps a child's shadow.
 *
 *  "Multiomics Data" and "Discovery to IND" deep-link to the two path states;
 *  the hrefs are real so the links work without JS and in a new tab. */
export default function Nav({ path, onChoose, onForm }) {
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

  const link = (l, extra = {}) => {
    if (l.path) {
      return (
        <a
          key={l.label}
          href={'?path=' + l.path}
          aria-current={path === l.path ? 'page' : undefined}
          className={path === l.path ? 'is-current' : undefined}
          onClick={(e) => { e.preventDefault(); setOpen(false); onChoose(l.path) }}
          {...extra}
        >{l.label}</a>
      )
    }
    return <a key={l.label} href={l.href} onClick={() => setOpen(false)} {...extra}>{l.label}</a>
  }

  const form = (e) => { e.preventDefault(); setOpen(false); onForm() }

  return (
    <header className={'nav' + (solid || open ? ' nav--solid' : '')}>
      <div className="nav__bar" ref={panel}>
        <a className="nav__brand" href="#top"><Logo /> Mextropic</a>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((l) => link(l))}
        </nav>

        <span className="nav__spacer" />

        <a className="btn btn--ghost nav__cta" href="#enquiry" onClick={form}>Book a call</a>
        <a className="btn btn--primary nav__primary" href="#enquiry" onClick={form}>
          <span className="nav__long">Scope your experiment</span>
          <span className="nav__short">Get a quote</span>
          <Arrow />
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
            {nav.map((l) => link(l))}
            <a className="nav__panel-cta" href="#enquiry" onClick={form}>Book a call</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export function Arrow({ size = 12 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 6h9M6.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
