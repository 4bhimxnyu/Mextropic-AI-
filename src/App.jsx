import { useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import LogoStrip from './components/LogoStrip.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Domains from './components/Domains.jsx'
import TrackItLive from './components/TrackItLive.jsx'
import Metrics from './components/Metrics.jsx'
import Enquiry from './components/Enquiry.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'

/** Section order matches Figma frame "Mextropic — Landing v2" top to bottom.
 *  Track it live -> Metrics -> Enquiry share the 64/64 tight gap (DESIGN-SPEC.md §4). */
export default function App() {
  // "Add to campaign" is only meaningful if the choice survives the jump to the form
  const [picked, setPicked] = useState([])
  const add = (name) => setPicked((p) => (p.includes(name) ? p : [...p, name]))
  const remove = (name) => setPicked((p) => p.filter((x) => x !== name))

  return (
    <div className="shell">
      <Nav />
      <main>
        <Hero />
        <LogoStrip />
        <HowItWorks />
        <Domains onAdd={add} picked={picked} />
        <TrackItLive />
        <Metrics />
        <Enquiry picked={picked} onRemove={remove} />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
