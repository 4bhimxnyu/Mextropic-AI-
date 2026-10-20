import { institutions } from '../data/site.js'

/** Figma "Credibility strip" (561:3015): the callout carries a 3px vermilion bar,
 *  a 1px divider separates it from the lockups, the lockups sit in one group. */
export default function LogoStrip() {
  return (
    <section className="section logos-strip">
      <div className="wrap logos">
        <p className="logos__label">Built by a team of<br />researchers from</p>
        <span className="logos__divider" aria-hidden="true" />
        <ul className="logos__list">
          {institutions.map((i) => (
            <li key={i.name}>
              <img
                className="logos__mark"
                src={i.src}
                alt={i.name}
                width={i.w}
                height={i.h}
                style={{ '--mark-h': i.h + 'px' }}
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
