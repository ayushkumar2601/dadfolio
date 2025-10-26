"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface Certification {
  id: number
  title: string
  description: string
  year: string
  icon: string
  image: string
}

const certifications: Certification[] = [
  { id: 1, title: "Techknow Master Winner-Cummins India", description: "TechKnow Master Winner 2018", year: "2018", icon: "🏆", image: "/t1p.png" },
  { id: 2, title: "Special Recognition Award for On-Highway Service, Cummins India", description: "Honored for outstanding contribution, commitment, and performance in on-highway service operations, demonstrating technical proficiency and service excellence.", year: "2023", icon: "⚙️", image: "/t2p.png" },
  { id: 3, title: "Faculty Training & Technology Advancement Award, George Telegraph Training Institute", description: "Presented in recognition of training and support provided to faculty on the latest automotive technologies, helping drive industry-aligned skill development.", year: "2022", icon: "📜", image: "/t3p.png" },
  { id: 4, title: "Service Support for Sales Enablement, Cummins India", description: "Providing seamless service support to empower sales teams, enhance efficiency, and drive revenue growth.", year: "2024", icon: "🔧", image: "/t44.png" },
  { id: 5, title: "Continuous Contribution", description: "For Outstanding Achievement and Continuous Contribution to the Success of Our Company", year: "2023", icon: "💻", image: "/t5p.png" },
  { id: 6, title: "Special Recognition Award", description: "Honoring outstanding contributions and exemplary performance that inspire excellence and make a lasting impact.", year: "2022", icon: "📄", image: "/t6p.png" },
]

export default function Certifications() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id") || "0")
            setVisibleItems((prev) => [...new Set([...prev, id])])
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = sectionRef.current.querySelectorAll("[data-id]")
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="certifications" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl">🏅</span>
            Awards & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition of expertise and continuous learning in automotive engineering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              data-id={cert.id}
              className={`group overflow-hidden bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-500 ${
                visibleItems.includes(cert.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                <p className="text-xs font-medium text-accent">{cert.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
