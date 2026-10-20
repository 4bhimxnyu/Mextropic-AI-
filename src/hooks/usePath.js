import { useCallback, useEffect, useState } from 'react'

const VALID = ['data', 'ind']

export function readPath() {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search).get('path')
  return VALID.includes(p) ? p : null
}

/** Scroll once the new content has actually rendered: two frames, not one,
 *  because the first frame is the commit and the second is the layout. */
export function scrollToSel(sel) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const el = document.querySelector(sel)
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }))
}

/** The chosen path lives in the URL (?path=data | ?path=ind) so a link can be
 *  shared and the back button undoes a choice — design-notes frame 564:6. */
export function usePath() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const on = () => setPath(readPath())
    window.addEventListener('popstate', on)
    return () => window.removeEventListener('popstate', on)
  }, [])

  const choose = useCallback((next, { scroll = true } = {}) => {
    setPath(next)
    const url = new URL(window.location.href)
    if (next) url.searchParams.set('path', next)
    else url.searchParams.delete('path')
    if (url.href !== window.location.href) window.history.pushState({ path: next }, '', url)
    if (scroll && next) scrollToSel('#offer')
  }, [])

  return [path, choose]
}
