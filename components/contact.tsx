"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react"

export default function Contact() {
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

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:ayush@example.com",
      color: "hover:text-accent",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com",
      color: "hover:text-accent",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com",
      color: "hover:text-accent",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm always interested in discussing innovative automotive technologies and new opportunities. Feel free to
            reach out!
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-8 mb-16">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-lg bg-card border border-border transition-all duration-300 hover:border-accent ${link.color} hover:shadow-lg hover:-translate-y-1`}
                  aria-label={link.label}
                >
                  <Icon size={24} />
                </a>
              )
            })}
          </div>

          {/* Email CTA */}
          <a
            href="mailto:ayush@example.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Send me an email
            <ExternalLink size={20} />
          </a>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2025 Ayush. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
