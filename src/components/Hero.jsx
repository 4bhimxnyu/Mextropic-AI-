export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-media">
        <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true" poster="/hero-poster.jpg">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="wrap hero-copy">
        <h1>
          Experimental Biomedical Data
          <br />
          at AI model speed.
        </h1>
        <div className="hero-ctas">
          <a className="btn btn-signal" href="#platform">Explore the platform</a>
          <a className="btn btn-ghost-dark" href="#enquiry">Talk to a scientist</a>
        </div>
      </div>
    </header>
  );
}
