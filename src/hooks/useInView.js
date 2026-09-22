import { useEffect, useRef, useState } from 'react'

/** Fires once when the element enters the viewport. DESIGN-SPEC.md 6.3 -
 *  the Figma reveal sits at t=0 on a shared timeline; on the web it must be
 *  triggered by the section actually arriving. */
export function useInView({ threshold = 0.2, once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])

  return [ref, inView]
}
