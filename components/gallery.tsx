"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface GalleryImage {
  id: number
  title: string
  category: string
  image: string
}

const galleryImages: GalleryImage[] = [
  { id: 1, title: "Drivers Training", category: "Workshop", image: "/w1.jpg" },
  { id: 2, title: "Customers Training", category: "Workshop", image: "/w2.jpg" },
  { id: 3, title: "Technician Training", category: "Training", image: "/w3.jpg" },
  { id: 4, title: "OffRoad Training", category: "Training", image: "/w5.jpg" },
  { id: 5, title: "Army Training", category: "Training", image: "/w10.jpg" },
  { id: 6, title: "Defence Training", category: "Workshop", image: "/w12.jpg" },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
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
    <section id="gallery" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl">📸</span> Workshop & Lab Moments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Behind-the-scenes glimpses of automotive engineering work and projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <div
              key={img.id}
              data-id={img.id}
              className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ${
                visibleItems.includes(img.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => setSelectedImage(img)}
            >
              <div className="relative w-full h-64">
                <Image
                  src={img.image}
                  alt={img.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-end p-4">
                <div>
                  <h3 className="text-white font-semibold">{img.title}</h3>
                  <p className="text-white/80 text-sm">{img.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-accent transition-colors"
            >
              <span className="text-2xl">✕</span>
            </button>
            <div className="relative w-full h-96">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="mt-4 text-white text-center">
              <h3 className="text-2xl font-semibold">{selectedImage.title}</h3>
              <p className="text-white/80">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
