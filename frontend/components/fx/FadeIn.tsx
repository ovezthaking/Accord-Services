"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right" | "none"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  threshold?: number
}

// Transform applied when the element enters (scrolling down into view)
const enterFromClasses: Record<Direction, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
}

// Transform applied when the element exits (scrolling back up — slides down and fades)
const exitToClasses: Record<Direction, string> = {
  up: "translate-y-12",
  down: "-translate-y-12",
  left: "translate-y-12",
  right: "translate-y-12",
  none: "translate-y-12",
}

export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
}: FadeInProps) {
  const { ref, state } = useInView({ threshold })

  // Determine transform and opacity based on state
  const getStyles = () => {
    switch (state) {
      case "before":
        // Not yet seen - apply enter transform (e.g. below viewport, waiting to slide up)
        return {
          className: `opacity-0 ${enterFromClasses[direction]}`,
          duration: duration,
          delay: delay,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // ease-out
        }
      case "visible":
        // In view - fully visible, no transform
        return {
          className: "opacity-100 translate-x-0 translate-y-0",
          duration: duration,
          delay: delay,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // ease-out
        }
      case "above":
        // Scrolled past it (element is above viewport) - keep visible, no animation
        return {
          className: "opacity-100 translate-x-0 translate-y-0",
          duration: 0,
          delay: 0,
          easing: "linear",
        }
      case "exiting":
        // Scrolling back up, element leaving from bottom - slide down and fade out
        return {
          className: `opacity-0 ${exitToClasses[direction]}`,
          duration: 200,
          delay: 0,
          easing: "cubic-bezier(0.55, 0, 1, 0.45)", // ease-in (accelerating)
        }
      default:
        return {
          className: "opacity-100",
          duration: duration,
          delay: 0,
          easing: "linear",
        }
    }
  }

  const styles = getStyles()

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${styles.duration}ms`,
        transitionDelay: `${styles.delay}ms`,
        transitionTimingFunction: styles.easing,
      }}
      className={cn("transition-all", styles.className, className)}
    >
      {children}
    </div>
  )
}
