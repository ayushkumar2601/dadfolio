// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Wrench, Cpu, Layout, Activity, Code, FileText } from "lucide-react"


// interface Tool {
//   id: number
//   name: string
//   category: string
//   icon: React.ReactNode
// }

// const tools: Tool[] = [
//   { id: 1, name: "PowerPoint", category: "MS Office", icon: "📐" },
//   { id: 2, name: "AutoCAD", category: "CAD", icon: "🖊️" },
//   { id: 3, name: "MATLAB", category: "Simulation", icon: "📊" },
//   { id: 4, name: "ANSYS", category: "Simulation", icon: "⚙️" },
//   { id: 5, name: "CATIA", category: "CAD", icon: "🔷" },
//   { id: 6, name: "CFX", category: "Simulation", icon: "💨" },
//   { id: 7, name: "Python", category: "Programming", icon: "🐍" },
//   { id: 8, name: "Excel", category: "Analysis", icon: "📈" },
// ]

// export default function Tools() {
//   const [visibleItems, setVisibleItems] = useState<number[]>([])
//   const sectionRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     if (!sectionRef.current) return

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = Number(entry.target.getAttribute("data-id") || "0")
//             setVisibleItems((prev) => [...new Set([...prev, id])])
//           }
//         })
//       },
//       { threshold: 0.1 }
//     )

//     const items = sectionRef.current.querySelectorAll("[data-id]")
//     items.forEach((item) => observer.observe(item))

//     return () => observer.disconnect()
//   }, [])

//   return (
//     <section id="tools" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
//             <Wrench className="text-accent" size={32} />
//             Tools & Technologies
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Professional tools and software I use for design, simulation, and analysis
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
//           {tools.map((tool, index) => (
//             <div
//               key={tool.id}
//               data-id={tool.id}
//               className={`group p-6 bg-gradient-to-br from-card to-card/50 border border-border rounded-xl hover:border-accent/50 hover:shadow-lg transition-all duration-500 text-center backdrop-blur-sm ${
//                 visibleItems.includes(tool.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//               }`}
//               style={{ transitionDelay: `${index * 50}ms` }}
//             >
//               <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{tool.icon}</div>
//               <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
//                 {tool.name}
//               </h3>
//               <p className="text-xs text-muted-foreground">{tool.category}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { useEffect, useRef, useState } from "react"
import { Wrench, Cpu, Layout, Activity, Code, FileText, Presentation, FileChartLine, ChartPie, Sheet, Mail, Cloud, BugPlay } from "lucide-react"

interface Tool {
  id: number
  name: string
  category: string
  icon: React.ReactNode
}

const tools: Tool[] = [
  { id: 1, name: "PowerPoint", category: "MS Office", icon: <Presentation size={40} className="text-accent" /> },
  { id: 2, name: "AutoCAD", category: "CAD", icon: <Layout size={40} className="text-accent" /> },
  { id: 3, name: "Word", category: "MS Office", icon: <FileChartLine size={40} className="text-accent" /> },
  { id: 4, name: "Power BI", category: "MS Office", icon: <ChartPie size={40} className="text-accent" /> },
  { id: 5, name: "Insite", category: "Inspection", icon: <BugPlay size={40} className="text-accent" /> },
  { id: 6, name: "SalesForce", category: "Data", icon: <Cloud size={40} className="text-accent" /> },
  { id: 7, name: "Outlook", category: "MS Office", icon: <Mail size={40} className="text-accent" /> },
  { id: 8, name: "Excel", category: "MS Office", icon: <Sheet size={40} className="text-accent" /> },
]

export default function Tools() {
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
    <section id="tools" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Wrench className="text-accent" size={32} />
            Tools & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional tools and software I use for design, simulation, and analysis
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={tool.id}
              data-id={tool.id}
              className={`group p-6 bg-gradient-to-br from-card to-card/50 border border-border rounded-xl hover:border-accent/50 hover:shadow-lg transition-all duration-500 text-center backdrop-blur-sm ${
                visibleItems.includes(tool.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="mb-3 group-hover:scale-110 transition-transform flex justify-center">
                {tool.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-muted-foreground">{tool.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
