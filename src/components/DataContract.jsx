import { useEffect, useState } from "react";
import { PARQUET_ROWS, FLAGGED } from "../data/catalogue.js";

const COLUMNS = ["design_id", "assay", "value", "censor", "flag", "plate", "run_date", "instrument"];

export default function DataContract() {
  const [rows, setRows] = useState(PARQUET_ROWS);

  useEffect(() => {
    // the table is seeded so it renders instantly, then refreshed from the API
    let alive = true;
    fetch("/api/campaign/MXQ-2026-0417/rows")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d?.rows?.length) setRows(d.rows); })
      .catch(() => { /* seeded rows stand in if the API is not running */ });
    return () => { alive = false; };
  }, []);

  return (
    <section className="sec sec-ground" id="data">
      <div className="wrap">
        <div className="head-centre reveal">
          <span className="eyebrow mono"><b /> The data <b /></span>
          <h2 style={{ marginTop: 22 }}>
            ML-ready from the <span className="it">first day.</span>
          </h2>
          <p className="lead" style={{ maxWidth: 760, marginTop: 20 }}>
            Structured, joinable rows with values, censoring flags, QC status and run covariates,
            streamed via API. Raw, unprocessed and processed biomedical data as per industry standards.
          </p>
        </div>

        <div className="card reveal" style={{ marginTop: 52 }} id="platform">
          <div className="table-head">
            <span className="path">campaign / MXQ-2026-0417 / results.parquet</span>
            <span className="live mono"><i /> Streaming via API</span>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>{COLUMNS.map((c) => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={`${r.design_id}-${r.assay}-${i}`}>
                    {COLUMNS.map((c) => {
                      const v = r[c];
                      const isFlag = (c === "flag" && FLAGGED.has(v)) || (c === "censor" && v === ">");
                      return (
                        <td key={c} className={v === "—" || v === "OK" ? "dim" : undefined}>
                          {isFlag ? <span className="flag">{v}</span> : v}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-foot">
            <span>Failures returned. Limits marked. Covariates exposed.</span>
            <span className="mono">Joinable on design_id</span>
          </div>
        </div>
      </div>
    </section>
  );
}
