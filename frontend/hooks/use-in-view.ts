"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

type ViewState = "before" | "visible" | "above" | "exiting"

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [state, setState] = useState<ViewState>("before")

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect
        const viewportHeight = window.innerHeight

        if (entry.isIntersecting) {
          // Element is visible
          setState("visible")
        } else {
          // Element left the viewport - determine which direction
          if (rect.top < 0) {
            // Element is ABOVE viewport (we scrolled past it going down)
            // Keep it visible/static - don't animate out
            setState("above")
          } else if (rect.top > viewportHeight * 0.5) {
            // Element is BELOW viewport (we scrolled up and it left from bottom)
            // This is when we want the exit animation
            setState((prev) => (prev === "visible" || prev === "above" ? "exiting" : "before"))
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, state }
}
