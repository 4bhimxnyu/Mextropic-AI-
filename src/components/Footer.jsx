import Logo from './Logo.jsx'
import { footerCols, contact } from '../data/site.js'
import { useViewport } from '../hooks/useViewport.js'

/** Always renders, path or no path. Brand · Explore · Legal.
 *  Compact: brand and contact, then every link in one wrapping row. */
export default function Footer({ onChoose, onForm }) {
  const { compact } = useViewport()

  const link = (l) => {
    if (l.path) {
      return <a key={l.label} href={'?path=' + l.path} onClick={(e) => { e.preventDefault(); onChoose(l.path) }}>{l.label}</a>
    }
    if (l.form) {
      return <a key={l.label} href="#enquiry" onClick={(e) => { e.preventDefault(); onForm() }}>{l.label}</a>
    }
    return <a key={l.label} href={l.href}>{l.label}</a>
  }

  return (
    <footer className="footer" id="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__col">
            <span style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 16 }}>
              <Logo stroke="var(--accent-primary)" /> Mextropic
            </span>
            <p className="body" style={{ maxWidth: 260 }}>
              Autonomous wet-lab infrastructure<br />for preclinical research.
            </p>
            <p className="small medium" style={{ color: 'var(--text-primary)' }}>
              {contact.map((c) => <a key={c} href={'mailto:' + c} style={{ display: 'block', textDecoration: 'none' }}>{c}</a>)}
            </p>
          </div>

          {compact ? (
            <nav className="footer__inline" aria-label="Footer">
              {footerCols.flatMap((col) => col.links).map(link)}
            </nav>
          ) : (
            footerCols.map((col) => (
              <nav className="footer__col" key={col.h} aria-label={col.h}>
                <p className="eyebrow" style={{ color: 'var(--accent-primary)' }}>{col.h}</p>
                {col.links.map(link)}
              </nav>
            ))
          )}
        </div>

        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} Mextropic. All rights reserved.</span>
          {!compact && <span>Built for research teams, not for slide decks.</span>}
        </div>
      </div>

      <div className="footer__wordmark" aria-hidden="true">MEXTROPIC</div>
    </footer>
  )
}
