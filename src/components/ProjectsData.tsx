import { useLanguage } from "./LanguageContext";

export interface Project {
  id: number;
  title: string;
  name: string;
  description: string;
  image: string; // Added this field
  link: string;
  technologies: string[];
  techIcons: { name: string; icon: string }[];
}

export const useProjectsData = (): Project[] => {
  const { t } = useLanguage();

  return [
    {
      id: 1,
      name: "KANZIN",
      title: "JLPT Preparation Platform",
      image: "/avatar.jpg", // Path to your public folder image
      link: "https://kanzin.vercel.app/",
      description: t("p1Description"),
      technologies: ["React", "JavaScript", "MongoDB", "Express", "Node.js", "Tailwind CSS"],
      techIcons: [
        { name: "React", icon: "https://skillicons.dev/icons?i=react" },
        { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
        { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
        { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
        { name: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
      ],
    },
    {
      id: 2,
      name: "Forever",
      title: "Full-Stack E-commerce Platform",
      image: "/avatar.jpg",
      link: "https://ecommerce-frontend-eight-sandy.vercel.app/",
      description: t("p2Description"),
      technologies: ["React", "JavaScript", "MongoDB", "Express", "Node.js", "Tailwind CSS"],
      techIcons: [
        { name: "React", icon: "https://skillicons.dev/icons?i=react" },
        { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
        { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
        { name: "Express", icon: "https://skillicons.dev/icons?i=express" },
        { name: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
      ],
    },
    {
      id: 3,
      name: "Codemeet",
      title: "Remote Interview Platform",
      image: "/avatar.jpg",
      link: "https://codemeet-3.onrender.com/",
      description: t("p3Description"),
      technologies: ["React", "Node.js", "Express", "Clerk", "Stream", "Tailwind CSS", "DaisyUI"],
      techIcons: [
        { name: "Clerk", icon: "https://cdn.worldvectorlogo.com/logos/clerk.svg" },
        { name: "React", icon: "https://skillicons.dev/icons?i=react" },
        { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
        { name: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
        { name: "Stream", icon: "https://getstream.io/static/0db97c9b84a9e9e6/stream-logo.png" },
      ],
    },
  ];
};