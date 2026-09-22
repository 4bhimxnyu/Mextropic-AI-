import { institutions } from '../data/site.js'

/** Figma "Credibility strip" (170:67): 120px tall, 36px vertical padding, 32px gap,
 *  centre-aligned. Real institution lockups, exported from Figma at 3x for retina. */
export default function LogoStrip() {
  return (
    <section className="section logos-strip">
      <div className="wrap logos">
        <p className="logos__label">Built by a team of researchers from</p>
        <ul className="logos__list">
          {institutions.map((i) => (
            <li key={i.name}>
              <img
                className="logos__mark"
                src={i.src}
                alt={i.name}
                width={i.w}
                height={i.h}
                style={{ height: i.h + 'px', width: 'auto' }}
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
