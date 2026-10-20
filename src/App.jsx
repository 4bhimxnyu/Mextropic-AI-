import { useCallback, useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import LogoStrip from './components/LogoStrip.jsx'
import Chooser from './components/Chooser.jsx'
import OfferData from './components/OfferData.jsx'
import OfferTracks from './components/OfferTracks.jsx'
import ValueProp from './components/ValueProp.jsx'
import Metrics from './components/Metrics.jsx'
import TrackItLive from './components/TrackItLive.jsx'
import Clients from './components/Clients.jsx'
import Enquiry from './components/Enquiry.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'
import { usePath, scrollToSel } from './hooks/usePath.js'
import { metricsData, metricsInd, faqs } from './data/site.js'

/** Iteration 6: one page, two conditional blocks (design-notes frame 564:6).
 *  Nothing below the chooser renders until a path is chosen; the footer always
 *  renders. The lead form has no home on the entry state in the design, so a
 *  CTA pressed before choosing reveals the form on its own rather than doing
 *  nothing — `formOpen`. */
export default function App() {
  const [path, choose] = usePath()
  const [formOpen, setFormOpen] = useState(false)

  // "Add to campaign" is only meaningful if the choice survives the jump to the form
  const [picked, setPicked] = useState([])
  const add = (name) => setPicked((p) => (p.includes(name) ? p : [...p, name]))
  const remove = (name) => setPicked((p) => p.filter((x) => x !== name))

  const openForm = useCallback(() => {
    setFormOpen(true)
    scrollToSel('#enquiry')
  }, [])

  // a deep link (?path=ind) should land on the offer, not the hero
  useEffect(() => {
    if (path && !window.location.hash) scrollToSel('#offer')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="shell">
      <Nav path={path} onChoose={choose} onForm={openForm} />
      <main>
        <Hero onForm={openForm} />
        <LogoStrip />
        <Chooser path={path} onChoose={choose} onForm={openForm} />

        {path === 'data' && (
          <div className="path path-enter" key="data">
            <OfferData onAdd={add} picked={picked} onForm={openForm} />
            <Metrics items={metricsData} />
            <Clients logos={false} />
            <Enquiry variant="data" picked={picked} onRemove={remove} />
            <Faq items={faqs.data} />
          </div>
        )}

        {path === 'ind' && (
          <div className="path path-enter" key="ind">
            <OfferTracks onForm={openForm} />
            <ValueProp />
            <Metrics items={metricsInd} />
            <TrackItLive />
            <Clients logos />
            <Enquiry variant="ind" />
            <Faq items={faqs.ind} />
          </div>
        )}

        {!path && formOpen && (
          <div className="path path-enter" key="form">
            <Enquiry variant="none" />
          </div>
        )}
      </main>
      <Footer onChoose={choose} onForm={openForm} />
    </div>
  )
}
