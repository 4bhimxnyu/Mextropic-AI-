import { offerTracks } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'
import { useViewport } from '../hooks/useViewport.js'
import { Arrow } from './Nav.jsx'
import { Check } from './Chooser.jsx'

/** Path B, "What we offer — hit to IND" (562:33). A four-phase pipeline, two
 *  brackets ("Phases 1–2", "Phases 3–4"), and two track cards each listing the
 *  assays that belong to that stage.
 *
 *  Compact: the pipeline is one swipeable row, and each track shows its assays
 *  as a cloud of names — the instrument tags are the detail a phone can skip. */
export default function OfferTracks({ onForm }) {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const { compact } = useViewport()

  return (
    <section className="section offer offer--ind" id="offer">
      <div className="wrap" ref={ref}>
        <div className={'section-head reveal' + (inView ? ' is-in' : '')}>
          <p className="eyebrow pill">{offerTracks.label}</p>
          <h2 className="h1" style={{ marginTop: 16, maxWidth: 560 }}>{offerTracks.title}</h2>
        </div>

        <ol className={'pipeline' + (compact ? ' pipeline--strip' : '')} aria-label="Discovery phases">
          {offerTracks.phases.map((p, i) => (
            <li key={p} className={'phase reveal' + (inView ? ' is-in' : '')} style={{ '--d': 120 + i * 80 + 'ms' }}>
              <span className="phase__n">{i + 1}</span>
              <span>{p}</span>
              {i < offerTracks.phases.length - 1 && <span className="phase__arrow" aria-hidden="true"><Arrow size={14} /></span>}
            </li>
          ))}
        </ol>

        <div className="tracks">
          {offerTracks.tracks.map((t, i) => (
            <div key={t.bracket} className={'track reveal' + (inView ? ' is-in' : '')} style={{ '--d': 360 + i * 120 + 'ms' }}>
              <div className={'track__bracket' + (i === 0 ? ' track__bracket--accent' : '')}>
                <span className="eyebrow">{t.bracket}</span>
              </div>
              <article className="tcard">
                <h3 className="tcard__title">{t.title}</h3>
                <p className="body" style={{ fontSize: 15 }}>{t.dek}</p>
                <span className="tcard__rule" />
                <p className="eyebrow">Assays in this track</p>

                {compact ? (
                  <ul className="assay-cloud">
                    {t.assays.map(([name], j) => (
                      <li key={name} className="assay-chip" style={{ '--d': 480 + i * 120 + j * 40 + 'ms' }}>{name}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="assays">
                    {t.assays.map(([name, tags], j) => (
                      <li key={name} className="assay" style={{ '--d': 480 + i * 120 + j * 50 + 'ms' }}>
                        <Check />
                        <span className="assay__name">{name}</span>
                        <span className="assay__tags">{tags}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="tcard__foot">
                  {!compact && <span className="eyebrow">{offerTracks.footer}</span>}
                  <a className="btn btn--ghost" href="#enquiry" onClick={(e) => { e.preventDefault(); onForm() }}>
                    {offerTracks.cta} <Arrow />
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
