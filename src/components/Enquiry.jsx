import { useState } from 'react'
import { contact } from '../data/site.js'

export default function Enquiry({ picked = [], onRemove }) {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // No endpoint is wired yet — see DESIGN-SPEC.md §8. This acknowledges locally
    // rather than pretending a submission succeeded.
    setSent(true)
  }

  return (
    <section className="section section--tight-top cta" id="enquiry">
      <div className="wrap">
        <div className="section-head" style={{ justifyItems: 'center', textAlign: 'center' }}>
          <p className="eyebrow">Get in touch</p>
          <h2 className="h1">Let&rsquo;s scope your first experiment.</h2>
          <p className="lead" style={{ maxWidth: 640 }}>
            Share the hypothesis, the data you need and your timeline. We define a focused pilot
            — assays, controls, deliverables, timeline and pricing — and deliver your first batch free.
          </p>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <div className="form__row form__row--2">
            <label className="field">
              <span className="eyebrow">Full name</span>
              <input name="name" placeholder="Dr Jane Okafor" required />
            </label>
            <label className="field">
              <span className="eyebrow">Work email</span>
              <input name="email" type="email" placeholder="jane@institution.org" required />
            </label>
          </div>

          <div className="form__row form__row--2">
            <label className="field">
              <span className="eyebrow">Company / institution</span>
              <input name="org" placeholder="Institution or company" />
            </label>
            <label className="field">
              <span className="eyebrow">Experiment type / target</span>
              <select name="type" defaultValue="">
                <option value="" disabled>Antibody engineering · Small molecule · Genomics</option>
                <option>Antibody engineering</option>
                <option>Small molecule</option>
                <option>Genomics</option>
                <option>Other</option>
              </select>
            </label>
          </div>

          {picked.length > 0 && (
            <div className="field">
              <span className="eyebrow">Selected assay domains</span>
              <ul className="chips">
                {picked.map((name) => (
                  <li className="chip" key={name}>
                    {name}
                    <button
                      type="button"
                      aria-label={'Remove ' + name}
                      onClick={() => onRemove && onRemove(name)}
                    >&times;</button>
                  </li>
                ))}
              </ul>
              {/* carried into the payload so the choice is not just decorative */}
              <input type="hidden" name="domains" value={picked.join(', ')} />
            </div>
          )}

          <label className="field">
            <span className="eyebrow">Research objective or hypothesis</span>
            <textarea name="objective" placeholder="What you want to test, and why it matters now." />
          </label>

          <div className="form__row form__row--2">
            <label className="field">
              <span className="eyebrow">Desired data or readouts</span>
              <input name="readouts" placeholder="IC50 curves, sequence-verified clones, RNA-seq counts…" />
            </label>
            <label className="field">
              <span className="eyebrow">Target timeline</span>
              <input name="timeline" placeholder="Within 4 weeks" />
            </label>
          </div>

          <label className="consent">
            <input type="checkbox" name="consent" required />
            <span>I agree to be contacted about this enquiry. Consent wording to be supplied by Mextropic.</span>
          </label>

          <div className="form__foot">
            <div>
              <p className="eyebrow">A scientist reads every message</p>
              <p className="small" style={{ marginTop: 4 }}>{contact.join(' · ')}</p>
            </div>
            {sent
              ? <span className="sent">Noted locally — no endpoint is connected yet.</span>
              : <button className="btn btn--primary" type="submit">Send enquiry &rarr;</button>}
          </div>
        </form>

        <p className="caption" style={{ textAlign: 'center', marginTop: 24 }}>
          Form submission workflow, privacy policy and consent language to be confirmed.
        </p>
      </div>
    </section>
  )
}
