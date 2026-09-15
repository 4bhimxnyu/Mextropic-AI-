import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#catalogue", label: "Catalogue" },
  { href: "#data", label: "Data" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    // the pill is glass over footage; once past the hero it has to go solid
    // or it becomes unreadable on the light sections
    const update = () => {
      const hero = document.querySelector(".hero");
      const limit = (hero ? hero.offsetHeight : 620) - 120;
      setSolid(window.scrollY > limit);
      ticking.current = false;
    };
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav">
      <div className={`nav-inner${solid ? " solid" : ""}${open ? " open" : ""}`}>
        <div className="nav-left">
          <a className="brand" href="#top">
            <span className="mark">M</span> Mextropic AI
          </a>
          <div className="nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <button
          className="navburger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
        <a className="btn btn-signal" href="#enquiry">Configure a campaign</a>
      </div>
    </nav>
  );
}
