"use client"

import React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "./LanguageContext"


const STACK_DATA = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Supabase", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg" },
  { name: "AWS", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Bun", icon: "https://icon.icepanel.io/Technology/svg/Bun.svg" },
]

const Stacks: React.FC = () => {
  const {t}=useLanguage();
  return (
    <section id="stack" className="py-12 px-4 ">
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]"
        >
          {t("stack")}
        </motion.h2>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3 items-center">
        {STACK_DATA.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative flex items-center justify-center"
          >
            {/* Tooltip */}
            <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 ease-out bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-[10px] font-bold px-3 py-1 rounded-full z-50 whitespace-nowrap">
              {tech.name}
            </div>

            {/* Icon */}
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-8 h-8 md:w-10 md:h-10  opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Stacks