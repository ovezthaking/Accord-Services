"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  exitTriggerRatio?: number
}

type ViewState = "before" | "visible" | "above" | "exiting"

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px 0px -100px 0px",
  exitTriggerRatio = 0.68,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [state, setState] = useState<ViewState>("before")
  const lastTopRef = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect
        const viewportHeight = window.innerHeight
        const previousTop = lastTopRef.current
        const isMovingDownInViewport = previousTop !== null && rect.top > previousTop
        const exitTriggerY = viewportHeight * exitTriggerRatio

        lastTopRef.current = rect.top

        if (entry.isIntersecting) {
          // While scrolling up, start exit slightly earlier before fully leaving the viewport.
          if (isMovingDownInViewport && rect.top > exitTriggerY) {
            setState((prev) => (prev === "visible" || prev === "above" ? "exiting" : "visible"))
          } else {
            setState("visible")
          }
        } else {
          // Element left the viewport - determine which direction
          if (rect.top < 0) {
            // Element is ABOVE viewport (we scrolled past it going down)
            // Keep it visible/static - don't animate out
            setState("above")
          } else if (rect.top > exitTriggerY) {
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
  }, [threshold, rootMargin, exitTriggerRatio])

  return { ref, state }
}
