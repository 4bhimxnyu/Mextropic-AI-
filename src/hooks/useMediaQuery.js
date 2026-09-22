import { useEffect, useState } from 'react'

/** Live media query. The browser re-evaluates on every resize and orientation
 *  change, so layout decisions follow the real viewport rather than a guess
 *  made at first render. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false
  )

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])

  return matches
}

/** Compact = phone portrait, or any short landscape window where a tall
 *  component would not fit. Both are checked continuously. */
export const COMPACT = '(max-width: 760px), (max-height: 520px) and (orientation: landscape)'
