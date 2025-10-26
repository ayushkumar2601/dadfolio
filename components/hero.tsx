"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div
        className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 transition-transform duration-300"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 transition-transform duration-300"
        style={{ transform: `translateY(${scrollY * -0.3}px)` }}
      />

      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Hi, I'm <span className="text-accent">Ajay</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-4 font-light">Automobile Engineer</p>

          <p className="text-lg sm:text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate about innovation and engineering excellence. Specializing in hydrogen vehicles and advanced
            diesel engine technologies for a sustainable automotive future.
          </p>

          <button
            onClick={() => scrollToSection("about")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Explore My Work
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
