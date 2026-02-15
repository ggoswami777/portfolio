"use client"

import React, { useEffect, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"
import { useProjectsData } from "./ProjectsData"

export const Projects = () => {
  const projects = useProjectsData()
  const { t } = useLanguage()
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
    containScroll: false,
  })

  const startAutoScroll = () => {
    if (!emblaApi) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)
  }

  useEffect(() => {
    if (!emblaApi) return
    startAutoScroll()

    emblaApi.on("pointerDown", () => {
      if (timerRef.current) clearInterval(timerRef.current)
    })

    emblaApi.on("pointerUp", () => {
      startAutoScroll()
    })

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [emblaApi])

  const displayProjects = projects.length <= 3 ? [...projects, ...projects] : projects;

  return (
    <section id="projects" className="overflow-hidden w-full">
      <div className="px-4 mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // Uses your theme's primary text color
          className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]"
        >
          {t("projects")}
        </motion.h2>
      </div>

      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {displayProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_52%] lg:flex-[0_0_48%] xl:flex-[0_0_42%] px-5"
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
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="
        block
        h-full
        rounded-2xl
        border
        /* Uses your dashed border color variable for the default state */
        border-[var(--color-border-dashed)]
        overflow-hidden
        /* Uses your theme's primary background color */
        bg-[var(--color-bg-primary)]
        transition-all
        duration-300
        /* Hover state uses the primary text color at low opacity for a subtle glow effect */
        hover:border-[var(--color-text-primary)]
      "
    >
      <div className="flex flex-col h-full">
  
        <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--color-border-dashed)] bg-gray-100 dark:bg-neutral-900">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-7 flex flex-col flex-grow">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            {project.name}
          </h2>
          
          <p className="text-sm opacity-60 leading-relaxed mb-6 flex-grow text-[var(--color-text-primary)]">
            {project.description}
          </p>

          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3 text-[var(--color-text-primary)] font-bold">
              Technologies
            </p>
            <div className="flex gap-3 flex-wrap">
              {project.techIcons.map((tech: any) => (
                <img
                  key={tech.name}
                  src={tech.icon}
                  alt={tech.name}
                  
                  className="w-6 h-6 transition-transform duration-300 hover:scale-110 brightness-100 dark:brightness-90"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  )
}