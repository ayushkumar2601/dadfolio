"use client"

import { useEffect, useRef, useState } from "react"
import { Zap, Lightbulb, Wrench } from "lucide-react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const highlights = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Driving technological advancement in automotive engineering",
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Creative solutions for complex engineering challenges",
    },
    {
      icon: Wrench,
      title: "Technical Expertise",
      description: "Deep knowledge in vehicle systems and design",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center">About Me</h2>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl overflow-hidden">
              <img
                src="/pp2.png"
                alt="Ayush - Automobile Engineer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              I'm an Automobile Engineer with a passion for sustainable transportation and cutting-edge vehicle
              technologies. My work focuses on developing innovative solutions in LNG Engines and advanced
              diesel engine systems.
            </p>

            <div className="space-y-6">
              {highlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors">
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
