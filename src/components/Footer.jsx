const COLUMNS = [
  { title: "Product", links: ["Assay catalogue", "Data schema", "Configure a campaign"] },
  { title: "Company", links: ["Blogs", "About", "Contact"] },
  { title: "Connect", links: ["LinkedIn", "X"] },
];

export default function Footer() {
  return (
    <footer id="about">
      <div className="wrap">
        <div className="foot-cols">
          <div>
            <a className="brand" style={{ color: "var(--ink)" }} href="#top">
              <span className="mark">M</span> Mextropic AI
            </a>
            <p style={{ marginTop: 16, color: "var(--graphite)", maxWidth: 320 }}>
              Data infrastructure for AI-led drug discovery.
            </p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h5>{c.title}</h5>
              {c.links.map((l) => <a key={l} href="#enquiry">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="foot-legal">
          <span>© {new Date().getFullYear()} Mextropic AI</span>
          <nav>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
