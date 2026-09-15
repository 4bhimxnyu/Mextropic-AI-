import { useState } from "react";
import { RESEARCH_AREAS } from "../data/catalogue.js";

const EMPTY = { name: "", email: "", org: "", area: RESEARCH_AREAS[0], message: "", campaign: [] };

export default function Enquiry({ campaign = [], onClear }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "bad"

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Use a valid work email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, campaign: campaign.map((c) => c.title) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStatus("ok");
      setForm(EMPTY);
      onClear?.();
    } catch {
      setStatus("bad");
    }
  };

  return (
    <section className="sec sec-tint" id="enquiry">
      <div className="wrap">
        <div className="head-centre reveal">
          <span className="eyebrow mono"><b /> Get in touch <b /></span>
          <h2 style={{ marginTop: 20 }}>
            Send an enquiry. <span className="it">We reply in a day.</span>
          </h2>
          <p className="lead" style={{ maxWidth: 620, marginTop: 18 }}>
            Send a specification, or just describe the problem. A scientist reads every message — by
            email first, and a call only if it is genuinely needed.
          </p>
        </div>

        <form className="form-card reveal" onSubmit={submit} noValidate>
          <div className="form-fields">
            {campaign.length > 0 && (
              <div className="chips mono" style={{ marginBottom: 24 }}>
                {campaign.map((c) => <span key={c.title}>{c.title}</span>)}
              </div>
            )}

            <div className="grid2">
              <div className={`field${errors.name ? " invalid" : ""}`}>
                <label className="mono" htmlFor="f-name">Full name</label>
                <input id="f-name" value={form.name} onChange={set("name")} placeholder="Dr Jane Okafor" />
                {errors.name && <span className="err">{errors.name}</span>}
              </div>
              <div className={`field${errors.email ? " invalid" : ""}`}>
                <label className="mono" htmlFor="f-email">Work email</label>
                <input id="f-email" type="email" value={form.email} onChange={set("email")} placeholder="jane@institution.org" />
                {errors.email && <span className="err">{errors.email}</span>}
              </div>
            </div>

            <div className="grid2">
              <div className="field">
                <label className="mono" htmlFor="f-org">Organisation</label>
                <input id="f-org" value={form.org} onChange={set("org")} placeholder="Institution or company" />
              </div>
              <div className="field">
                <label className="mono" htmlFor="f-area">Research area</label>
                <select id="f-area" value={form.area} onChange={set("area")}>
                  {RESEARCH_AREAS.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label className="mono" htmlFor="f-msg">What are you looking to solve?</label>
              <textarea id="f-msg" value={form.message} onChange={set("message")}
                placeholder="Target, prior data, constraints — anything that shapes the answer." />
            </div>
          </div>

          <div className="form-bar">
            <div>
              <span className="mono" style={{ color: "var(--subtle)" }}>A scientist reads every message</span>
              <b>Reply within 24 hours</b>
              {status === "ok" && <span className="form-status ok">Thanks — we’ll be in touch within 24 hours.</span>}
              {status === "bad" && <span className="form-status bad">Something went wrong. Email pranav@mextropic.com instead.</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a className="mono" style={{ color: "var(--muted)" }} href="mailto:pranav@mextropic.com">
                pranav@mextropic.com
              </a>
              <button className="btn btn-signal" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send enquiry →"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
