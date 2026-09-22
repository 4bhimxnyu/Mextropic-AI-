import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { nav } from '../data/site.js'

/** DESIGN-SPEC.md 6.5 - transparent until 24px of scroll, then fill + hairline + shadow.
 *  The wrapper must not clip: a clipping parent silently caps a child's shadow. */
export default function Nav() {
  const [solid, setSolid] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    const update = () => { ticking.current = false; setSolid(window.scrollY > 24) }
    const onScroll = () => {
      if (!ticking.current) { ticking.current = true; requestAnimationFrame(update) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={'nav' + (solid ? ' nav--solid' : '')}>
      <div className="nav__bar">
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
      </div>
    </header>
  )
}
