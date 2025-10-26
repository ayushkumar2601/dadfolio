"use client"

import { Download } from "lucide-react"

export default function ResumeCTA() {
  const handleDownload = () => {
    // Create a simple PDF download link
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Ajay_Resume.pdf"
    link.click()
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent/10 to-accent/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Ready to see my full experience?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Download my comprehensive resume to learn more about my projects, skills, and professional background.
        </p>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <Download size={20} />
          Download Resume (PDF)
        </button>
      </div>
    </section>
  )
}
