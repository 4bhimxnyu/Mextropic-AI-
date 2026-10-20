import { dashboard } from '../data/site.js'
import { useInView } from '../hooks/useInView.js'

const { campaign } = dashboard

/** Path B only (brief: "dashboard only in biotech section"). Figma 556:1096 adds
 *  a sensorgram strip above the table — three binding curves that draw in. */
export default function TrackItLive() {
  const [ref, inView] = useInView()

  return (
    <section className="section section--tight-bottom track">
      <div className="wrap">
        <div className="section-head section-head--centre">
          <p className="eyebrow pill">{dashboard.label}</p>
          <h2 className="h2">{dashboard.title}</h2>
          <p className="lead" style={{ maxWidth: 620 }}>{dashboard.dek}</p>
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

              <div className="chart">
                <p className="small chart__title">{campaign.chart}</p>
                <Sensorgram run={inView} />
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

/* Association then dissociation: a rise to a plateau at x=0.5, then decay.
   Three concentrations, three plateaus. Drawn with stroke-dashoffset. */
function Sensorgram({ run }) {
  const W = 600, H = 90
  const curve = (peak) => {
    const pts = []
    for (let i = 0; i <= 60; i++) {
      const x = i / 60
      const y = x <= 0.5
        ? peak * (1 - Math.exp(-x * 9))
        : peak * (1 - Math.exp(-0.5 * 9)) * Math.exp(-(x - 0.5) * 2.4)
      pts.push([x * W, H - 6 - y * (H - 14)])
    }
    return 'M' + pts.map(([x, y]) => x.toFixed(1) + ',' + y.toFixed(1)).join(' L')
  }
  return (
    <svg className={'sensorgram' + (run ? ' is-in' : '')} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1={H - 6} x2={W} y2={H - 6} className="sensorgram__axis" />
      <line x1={W / 2} y1="0" x2={W / 2} y2={H} className="sensorgram__axis sensorgram__axis--dash" />
      {[1, 0.62, 0.3].map((p, i) => (
        <path key={p} d={curve(p)} className="sensorgram__curve" style={{ '--d': i * 160 + 'ms', opacity: 1 - i * 0.28 }} />
      ))}
    </svg>
  )
}
