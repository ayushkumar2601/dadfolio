"use client"

import { useEffect, useRef, useState } from "react"

interface Certification {
  id: number
  title: string
  description: string
  year: string
  icon: string
  image: string
}

const certifications: Certification[] = [
  {
    id: 1,
    title: "SAE India Collegiate Club",
    description: "Active member and contributor to automotive engineering projects and competitions",
    year: "2023-Present",
    icon: "🏆",
    image: "/sae-automotive-engineering-competition.jpg",
  },
  {
    id: 2,
    title: "Hydrogen Vehicle Technology Workshop",
    description: "Advanced training in hydrogen fuel cell systems and sustainable propulsion",
    year: "2023",
    icon: "⚡",
    image: "/hydrogen-fuel-cell.png",
  },
  {
    id: 3,
    title: "BS6 Emission Standards Certification",
    description: "Comprehensive understanding of BS6 compliance and emission control technologies",
    year: "2022",
    icon: "🌱",
    image: "/emission-control-automotive-standards.jpg",
  },
  {
    id: 4,
    title: "Advanced Diesel Engine Design",
    description: "Specialized training in modern diesel engine optimization and performance",
    year: "2023",
    icon: "🔧",
    image: "/diesel-engine-design-workshop.jpg",
  },
  {
    id: 5,
    title: "CAD & Simulation Proficiency",
    description: "Expert-level training in SolidWorks, AutoCAD, and ANSYS simulations",
    year: "2022",
    icon: "💻",
    image: "/cad-software-automotive-design.jpg",
  },
  {
    id: 6,
    title: "Research Paper Publication",
    description: "Published research on advanced combustion technologies in automotive engineering",
    year: "2023",
    icon: "📄",
    image: "/research-paper-automotive-technology.jpg",
  },
]

export default function Certifications() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number.parseInt(entry.target.getAttribute("data-id") || "0")
            setVisibleItems((prev) => [...new Set([...prev, id])])
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-id]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl">🏅</span>
            Certifications & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition of expertise and continuous learning in automotive engineering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              data-id={cert.id}
              className={`group overflow-hidden bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-500 ${
                visibleItems.includes(cert.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative overflow-hidden h-40 bg-muted">
                <img
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
