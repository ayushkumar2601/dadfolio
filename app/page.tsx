"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Timeline from "@/components/timeline"
import Research from "@/components/research"
import Certifications from "@/components/certifications"
import Tools from "@/components/tools"
import Gallery from "@/components/gallery"
import Blog from "@/components/blog"
import ResumeCTA from "@/components/resume-cta"
import Contact from "@/components/contact"
import BackToTop from "@/components/back-to-top"
import Chatbot from "@/components/chatbot"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "timeline",
        "research",
        "certifications",
        "tools",
        "gallery",
        "blog",
        "contact",
      ]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar activeSection={activeSection} />
      <Hero />
      <About />
      <Timeline />
      <Research />
      <Certifications />
      <Tools />
      <Gallery />
      <Blog />
      <ResumeCTA />
      <Contact />
      <BackToTop />
      <Chatbot />
    </main>
  )
}
