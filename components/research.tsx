"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Zap, Fuel } from "lucide-react";

interface ResearchCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Research() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const researchAreas: ResearchCard[] = [
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "LNG-Powered Engines",
      description:
        "Advancing the adaptation of next-generation LNG-powered engine systems for less-emission vehicles, optimizing efficiency and durability.",
    },
    {
      icon: <Fuel className="w-8 h-8 text-accent" />,
      title: "BS6 Diesel Engines",
      description:
        "Advanced diesel engine technologies meeting BS6 emission standards while maintaining performance and fuel efficiency.",
    },
  ];

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-center">
          What I'm Working On
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Focused on sustainable and innovative automotive technologies
        </p>

        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {researchAreas.map((area, index) => (
            <div
              key={index}
              className="group bg-background border border-border rounded-xl p-8 hover:border-accent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 p-3 bg-accent/10 rounded-lg w-fit group-hover:bg-accent/20 transition-colors">
                {area.icon}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {area.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
