import { campaign } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'

export default function TrackItLive() {
  const [ref, inView] = useInView()

  return (
    <section className="section section--tight-bottom track">
      <div className="wrap">
        <div className="section-head" style={{ justifyItems: 'center', textAlign: 'center' }}>
          <p className="eyebrow">Visibility</p>
          <h2 className="h2">See every run, live.</h2>
          <p className="lead" style={{ maxWidth: 620 }}>
            Samples, QC and results land as each run clears — one campaign ID, one schema, failures included.
          </p>
        </div>

        <div ref={ref} className={'panel reveal' + (inView ? ' is-in' : '')}>
          <div className="panel__bar">
            <span className="panel__dot" />
            <span className="panel__dot" />
            <span className="panel__dot" />
            <span className="panel__title">{campaign.id}</span>
            <span className="panel__status"><i />Running</span>
          </div>

          <div className="panel__body">
            <aside className="panel__side">
              <p className="eyebrow" style={{ marginBottom: 8 }}>Campaign</p>
              {campaign.nav.map((n) => (
                <span key={n} className={'panel__nav' + (n === campaign.active ? ' is-on' : '')}>
                  <i />{n}
                </span>
              ))}
            </aside>

            <div className="panel__main">
              <div className="kpis">
                {campaign.kpis.map((k) => (
                  <div key={k.l} className="kpi"><b>{k.v}</b><span>{k.l}</span></div>
                ))}
              </div>

              <table className="tbl">
                <thead>
                  <tr>
                    <th>Design ID</th><th>Assay</th><th>Value</th><th>Flag</th><th>Run</th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.rows.map((r) => (
                    <tr key={r.id}>
                      <td className="mono">{r.id}</td>
                      <td>{r.assay}</td>
                      <td className="mono">{r.value}</td>
                      <td>{r.flag ? <span className="flag">{r.flag}</span> : ''}</td>
                      <td>
                        <span
                          className={'bar' + (r.run < 1 ? ' bar--mute' : '')}
                          style={{ display: 'block', width: Math.round(r.run * 54) + 'px' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="caption">Figures shown are illustrative, not a live campaign.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
