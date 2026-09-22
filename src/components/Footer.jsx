import Logo from './Logo.jsx'
import { footerCols, contact, office } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__col">
            <span style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 15 }}>
              <Logo /> Mextropic
            </span>
            <p className="body" style={{ maxWidth: 260 }}>
              Autonomous wet-lab infrastructure for preclinical research.
            </p>
            <p className="small medium" style={{ color: 'var(--text-primary)' }}>
              {contact.map((c) => <span key={c} style={{ display: 'block' }}>{c}</span>)}
            </p>
            <address className="small" style={{ fontStyle: 'normal', color: 'var(--text-secondary)' }}>
              {office.map((line) => <span key={line} style={{ display: 'block' }}>{line}</span>)}
            </address>
          </div>

          {footerCols.map((col) => (
            <nav className="footer__col" key={col.h} aria-label={col.h}>
              <p className="eyebrow" style={{ color: 'var(--accent-primary)' }}>{col.h}</p>
              {col.links.map((l) => <a key={l} href="#top">{l}</a>)}
            </nav>
          ))}
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Mextropic. All rights reserved.</span>
          <span>Built for research teams, not for slide decks.</span>
        </div>
      </div>

      {/* 176px Regular at −6% tracking — a quiet watermark, never bold (spec §3) */}
      <div className="footer__wordmark" aria-hidden="true">MEXTROPIC</div>
    </footer>
  )
}
