import { useEffect, useRef, useState } from 'react'

/** DESIGN-SPEC.md 6.4 - scroll progress across the SECTION's own extent.
 *  Returns `active` in 0..steps, so the readout is active * (100 / steps).
 *
 *  A fixed viewport window (the original bug) saturates at 100% early and then
 *  sits there for the rest of the section, making further scrolling look dead. */
export function useScrollProgress(steps = 4) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(steps)
      return
    }

    let ticking = false
    const update = () => {
      ticking = false
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const travel = Math.max(1, r.height + vh * 0.5)
      const raw = (vh * 0.85 - r.top) / travel
      const p = Math.min(1, Math.max(0, raw))
      setActive(Math.round(p * steps))   // round, not floor: floor makes 100% unreachable
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [steps])

  return [ref, active]
}
