"use client"

import { useEffect, useRef, useState } from "react"

interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
  type: "work" | "education"
}

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([])
  const ref = useRef(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const timelineItems: TimelineItem[] = [
    {
      year: "2023 - Present",
      title: "Senior Automobile Engineer",
      company: "Advanced Mobility Solutions",
      description: "Leading hydrogen fuel cell vehicle development and optimization",
      type: "work",
    },
    {
      year: "2022 - 2023",
      title: "Automotive Engineer",
      company: "Diesel Systems Inc.",
      description: "Developed BS6 compliant diesel engine technologies",
      type: "work",
    },
    {
      year: "2021",
      title: "Internship",
      company: "Global Motors",
      description: "Engine performance testing and analysis",
      type: "work",
    },
    {
      year: "2020",
      title: "B.Tech in Automobile Engineering",
      company: "Engineering Institute",
      description: "Specialized in vehicle dynamics and propulsion systems",
      type: "education",
    },
  ]

  useEffect(() => {
    const observers = itemRefs.current.map((itemRef, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        },
        { threshold: 0.2 },
      )

      if (itemRef) {
        observer.observe(itemRef)
      }

      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center">Experience & Education</h2>

        <div ref={ref}>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent to-accent/20 transform md:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  className={`relative pl-12 md:pl-0 transition-all duration-700 ${
                    visibleItems[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-2 w-4 h-4 bg-accent rounded-full border-4 border-background transform md:-translate-x-1/2 -translate-x-1/2 transition-transform duration-700 hover:scale-125" />

                  {/* Content card */}
                  <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent/50 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-accent">{item.year}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.type === "work" ? "bg-accent/10 text-accent" : "bg-muted text-foreground"
                        }`}
                      >
                        {item.type === "work" ? "Work" : "Education"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-accent font-semibold mb-2">{item.company}</p>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
