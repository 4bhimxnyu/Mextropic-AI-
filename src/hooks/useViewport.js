import { createContext, createElement, useContext, useEffect, useState } from 'react'

/** Live viewport measurement.
 *
 *  One listener for the whole app. Every resize, orientation change and
 *  on-screen-keyboard / browser-chrome change (visualViewport) is coalesced
 *  into a single requestAnimationFrame, then the numbers are published two
 *  ways: as React state for components that change what they render, and as
 *  CSS custom properties + a data-layout attribute on <html> for the
 *  stylesheet. `--vh` is the real inner height in px, which `100vh` is not on
 *  phones (it ignores the retracting address bar).
 *
 *  Breakpoints are decided here, once, from the measured numbers, not in a
 *  dozen media queries that can drift apart. */

const THRESHOLDS = {
  compact: 760,    // phone, or anything narrower than a comfortable two-column layout
  narrow: 420,     // small phone: single column everywhere, tighter type
  tablet: 1040,    // nav links collapse behind the toggle below this
  shortLandscape: 520,
}

export function measure() {
  if (typeof window === 'undefined') {
    return { width: 1440, height: 900, layout: 'regular', compact: false, narrow: false, tablet: false, landscape: true, short: false, scale: 1 }
  }
  const vv = window.visualViewport
  const width = Math.round(vv ? vv.width : window.innerWidth)
  const height = Math.round(vv ? vv.height : window.innerHeight)
  const landscape = width > height
  const short = landscape && height < THRESHOLDS.shortLandscape
  const compact = width < THRESHOLDS.compact || short
  const narrow = width < THRESHOLDS.narrow
  const tablet = !compact && width < THRESHOLDS.tablet
  // 0.72 .. 1: how far the design width has to shrink. CSS uses it for type
  // and spacing so the page scales continuously instead of snapping.
  const scale = Math.min(1, Math.max(0.72, width / 1440))
  const layout = narrow ? 'narrow' : compact ? 'compact' : tablet ? 'tablet' : 'regular'
  return { width, height, landscape, short, compact, narrow, tablet, scale, layout }
}

function publish(v) {
  const root = document.documentElement
  root.style.setProperty('--vw', v.width + 'px')
  root.style.setProperty('--vh', v.height + 'px')
  root.style.setProperty('--scale', String(v.scale))
  root.dataset.layout = v.layout
  root.dataset.orientation = v.landscape ? 'landscape' : 'portrait'
}

const ViewportContext = createContext(measure())

export function ViewportProvider({ children }) {
  const [v, setV] = useState(measure)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const next = measure()
      publish(next)
      setV((prev) =>
        prev.width === next.width && prev.height === next.height && prev.layout === next.layout ? prev : next
      )
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('orientationchange', schedule, { passive: true })
    window.visualViewport?.addEventListener('resize', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('orientationchange', schedule)
      window.visualViewport?.removeEventListener('resize', schedule)
    }
  }, [])

  return createElement(ViewportContext.Provider, { value: v }, children)
}

/** { width, height, layout, compact, narrow, tablet, landscape, short, scale } */
export function useViewport() {
  return useContext(ViewportContext)
}
