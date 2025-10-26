"use client"

import { useEffect, useRef, useState } from "react"
import { BookOpen, ArrowRight } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  summary: string
  date: string
  category: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Hydrogen Vehicles",
    summary:
      "Exploring the potential of hydrogen fuel cells as a sustainable alternative to traditional combustion engines. Discussing challenges, opportunities, and the timeline for mass adoption.",
    date: "March 15, 2024",
    category: "Technology",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Understanding BS6 Emission Standards",
    summary:
      "A comprehensive guide to BS6 compliance requirements and how modern engines are engineered to meet these stringent emission standards while maintaining performance.",
    date: "March 10, 2024",
    category: "Regulations",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Advanced Diesel Engine Optimization",
    summary:
      "Deep dive into modern diesel engine technologies, turbocharging systems, and combustion optimization techniques that improve efficiency and reduce emissions.",
    date: "March 5, 2024",
    category: "Engineering",
    readTime: "7 min read",
  },
]

export default function Blog() {
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
    <section id="blog" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <BookOpen className="text-accent" size={32} />
            My Thoughts & Research
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights and perspectives on automotive engineering, sustainability, and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              data-id={post.id}
              className={`group p-6 bg-card border border-border rounded-xl flex flex-col transition-all duration-700 ${
                visibleItems.includes(post.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{post.summary}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <button className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1">
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
