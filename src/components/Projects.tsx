"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { useProjectsData } from "./ProjectsData"

export const Projects = () => {
  const projects = useProjectsData()
  const { t } = useLanguage()

  // Initialize Embla with loop and 5s Autoplay
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])

  return (
    <section id="projects" className="py-20 overflow-hidden">
      <div className="px-4 md:px-[18%] mb-12">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tighter"
        >
          {t("projects")}
        </motion.h2>
      </div>

      {/* Viewport - This hides the overflow and allows "half-half" view */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_60%] md:flex-[0_0_45%] px-3"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project }: { project: any }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="h-full rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col"
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
    >
      {/* Top Section: Hero Image/UI (Like the screenshot) */}
      <div className="relative aspect-video w-full bg-[#111] overflow-hidden border-b border-white/5 p-6 flex items-center justify-center">
        {/* Placeholder for the "Open Graph" UI style in your image */}
        <div className="w-full h-full rounded-lg border border-white/10 bg-black flex flex-col items-center justify-center text-center p-4">
           <img 
            src={project.image} 
            alt={project.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
           />
           <h3 className="text-xl md:text-2xl font-semibold z-10">{project.title}</h3>
           <div className="mt-4 w-full h-8 bg-white/5 rounded-full border border-white/10 flex items-center px-4 text-[10px] opacity-40">
              Enter any URL to inspect...
           </div>
        </div>
      </div>

      {/* Bottom Section: Info */}
      <div className="p-6 md:p-8 flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">{project.name}</h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-[90%]">
            {project.description}
          </p>
        </div>

        {/* Technologies Section */}
        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">
            Technologies
          </p>
          <div className="flex flex-wrap gap-3">
            {project.techIcons.map((tech: any) => (
              <div key={tech.name} className="group relative">
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-6 h-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-help"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}