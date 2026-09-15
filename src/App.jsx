import { useCallback, useEffect, useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import DataContract from "./components/DataContract.jsx";
import Loop from "./components/Loop.jsx";
import CatalogueRail from "./components/CatalogueRail.jsx";
import Testimonial from "./components/Testimonial.jsx";
import Enquiry from "./components/Enquiry.jsx";
import Footer from "./components/Footer.jsx";

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [campaign, setCampaign] = useState([]);
  useReveal();

  // "Add to campaign" collects categories, then pre-fills the enquiry
  const addToCampaign = useCallback((item) => {
    setCampaign((c) => (c.some((x) => x.title === item.title) ? c : [...c, item]));
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <DataContract />
      <Loop />
      <CatalogueRail onAdd={addToCampaign} />
      <Testimonial />
      <Enquiry campaign={campaign} onClear={() => setCampaign([])} />
      <Footer />
    </>
  );
}
