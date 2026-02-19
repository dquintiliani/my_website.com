"use client"

import { useEffect } from "react"

export function ScrollFadeIn() {
  useEffect(() => {
    const fadeEls = document.querySelectorAll(".fade-in-element")
    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            fadeObs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    fadeEls.forEach((el) => fadeObs.observe(el))
    return () => fadeObs.disconnect()
  }, [])

  return null
}
