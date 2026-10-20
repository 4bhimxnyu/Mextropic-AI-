import { useState } from 'react'
import { enquiry, contact } from '../data/site.js'
import { useViewport } from '../hooks/useViewport.js'
import { Arrow } from './Nav.jsx'

/** The lead form, with field labels that follow the chosen path (Figma
 *  "Final CTA" 561:927 / 556:1222). No endpoint exists yet, so a submission
 *  opens the visitor's email client with the answers addressed to the founders.
 *
 *  Compact: four fields. Objective and readouts sit behind "Add details" so the
 *  form fits a phone screen and still gets sent. */
export default function Enquiry({ variant = 'none', picked = [], onRemove }) {
  const v = enquiry[variant] || enquiry.none
  const { compact } = useViewport()
  const [sent, setSent] = useState(false)
  const [more, setMore] = useState(false)
  const showDetails = !compact || more

  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const lines = [
      'Name: ' + (f.get('name') || ''),
      'Email: ' + (f.get('email') || ''),
      'Organisation: ' + (f.get('org') || ''),
      v.typeLabel + ': ' + (f.get('type') || ''),
      picked.length ? 'Selected: ' + picked.join(', ') : null,
      f.get('objective') ? 'Objective: ' + f.get('objective') : null,
      f.get('readouts') ? v.readoutsLabel + ': ' + f.get('readouts') : null,
      'Timeline: ' + (f.get('timeline') || ''),
    ].filter(Boolean)
    const subject = 'Enquiry via mextropic.com' + (variant !== 'none' ? ' (' + (variant === 'data' ? 'multiomics data' : 'discovery to IND') + ')' : '')
    window.location.href = 'mailto:' + contact.join(',') +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(lines.join('\n'))
    setSent(true)
  }

  return (
    <section className="section section--tight-top cta" id="enquiry">
      <div className="wrap">
        <div className="section-head section-head--centre">
          <p className="eyebrow pill">Get in touch</p>
          <h2 className="h1">{v.title}</h2>
          {!compact && <p className="lead" style={{ maxWidth: 640 }}>{enquiry.dek}</p>}
        </div>

        <form className="form" onSubmit={onSubmit}>
          <div className="form__row form__row--2">
            <label className="field">
              <span className="eyebrow">Full name</span>
              <input name="name" placeholder="Dr Jane Okafor" required autoComplete="name" />
            </label>
            <label className="field">
              <span className="eyebrow">Work email</span>
              <input name="email" type="email" placeholder="jane@institution.org" required autoComplete="email" />
            </label>
          </div>

          <div className="form__row form__row--2">
            <label className="field">
              <span className="eyebrow">Company / institution</span>
              <input name="org" placeholder="Institution or company" autoComplete="organization" />
            </label>
            <label className="field">
              <span className="eyebrow">{v.typeLabel}</span>
              <select name="type" defaultValue="">
                <option value="" disabled>{v.typeHint}</option>
                {v.types.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
          </div>

          {picked.length > 0 && (
            <div className="field">
              <span className="eyebrow">Selected modalities</span>
              <ul className="chips">
                {picked.map((name) => (
                  <li className="chip" key={name}>
                    {name}
                    <button type="button" aria-label={'Remove ' + name} onClick={() => onRemove && onRemove(name)}>&times;</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showDetails && (
            <>
              <label className="field">
                <span className="eyebrow">Research objective or hypothesis</span>
                <textarea name="objective" placeholder="What you want to test, and why it matters now." />
              </label>
              <div className="form__row form__row--2">
                <label className="field">
                  <span className="eyebrow">{v.readoutsLabel}</span>
                  <input name="readouts" placeholder={v.readoutsHint} />
                </label>
                <label className="field">
                  <span className="eyebrow">Target timeline</span>
                  <input name="timeline" placeholder="Within 4 weeks" />
                </label>
              </div>
            </>
          )}
          {!showDetails && (
            <div className="form__row form__row--2">
              <label className="field">
                <span className="eyebrow">Target timeline</span>
                <input name="timeline" placeholder="Within 4 weeks" />
              </label>
              <button type="button" className="form__more" onClick={() => setMore(true)}>
                + Add details
              </button>
            </div>
          )}

          <label className="consent">
            <input type="checkbox" name="consent" required />
            <span>{enquiry.consent}</span>
          </label>

          <div className="form__foot">
            <div>
              <p className="eyebrow">{enquiry.note}</p>
              {!compact && <p className="small medium" style={{ marginTop: 4, color: 'var(--text-primary)' }}>{contact.join(' · ')}</p>}
            </div>
            {sent
              ? <span className="sent">Your email app should open with the details. If not, write to {contact[0]}.</span>
              : <button className="btn btn--primary" type="submit">Send enquiry <Arrow /></button>}
          </div>
        </form>
      </div>
    </section>
  )
}
