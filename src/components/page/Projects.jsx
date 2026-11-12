import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Section from "../ui/Section";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// Expanded Project Data
const PROJECTS = [
  {
    name: "Exit Exam Preparation System",
    desc: "Online exam administration with question banks, secure delivery, results, and analytics.",
    tech: ["Node.js", "PostgreSQL", "React", "Tailwind CSS"],
    status: "Live",
    images: [
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    ],
    githubUrl: "#",
    liveUrl: "https://ethioexit.neyasoft.com/",
  },

  {
    name: "NGAT Online Learning & Assessment System",
    desc: "Comprehensive online learning and assessment platform featuring practice exams, exit examinations, question banks, student progress tracking, VIP subscriptions, and performance analytics.",
    tech: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    status: "Live",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    ],
    githubUrl: "#",
    liveUrl: "https://ngat.neyasoft.com/",
  },

  {
    name: "Laboratory Management System for MAU",
    desc: "Integrated laboratory management platform for managing laboratory resources, equipment, test requests, sample tracking, test results, inventory, and laboratory operations with reporting and analytics.",
    tech: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    status: "Live",
    images: [
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581093458791-9d42e3c5e3e8?auto=format&fit=crop&q=80",
    ],
    githubUrl: "#",
    liveUrl: "http://mau-lms.neyasoft.com/",
  },

  {
    name: "MAU SACCO Management System",
    desc: "Comprehensive savings and credit cooperative management platform for handling member registration, savings accounts, deposits, withdrawals, loan applications, loan repayments, financial transactions, and financial reporting.",
    tech: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    status: "Live",
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    ],
    githubUrl: "#",
    liveUrl: "#",
  },

  {
    name: "School Management System",
    desc: "Comprehensive platform for students, teachers, courses, exams, attendance, and reports.",
    tech: ["Asp Net", "React", "TypeScript", "Tailwind CSS"],
    status: "In progress",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    ],
    githubUrl: "#",
    liveUrl: "#",
  },

  {
    name: "Grade 9 - 12 Question Bank System",
    desc: "A web-based platform for managing and delivering a comprehensive question bank for grades 9 to 12, including question categorization, difficulty levels, and exam generation.",
    tech: ["Asp Net", "React", "TypeScript", "Tailwind CSS"],
    status: "In progress",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
    ],
    githubUrl: "#",
    liveUrl: "#",
  },

  {
    name: "E-Commerce Platform",
    desc: "Modern shopping experience with Stripe payments, cart, and admin dashboard.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    status: "In progress",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
    ],
    githubUrl: "https://github.com/Hailelove/Web-base-e-commerce-system-",
    liveUrl: "3",
  },

  {
    name: "Online Learning Platform",
    desc: "A comprehensive online learning platform with course management, video streaming, quizzes, and progress tracking.",
    tech: ["React", "Express", "MongoDB"],
    status: "In progress",
    images: [
      "https://images.unsplash.com/photo-1581091012184-7f0b1c8e5f3d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581091012184-7f0b1c8e5f3d?auto=format&fit=crop&q=80",
    ],
    githubUrl: "#",
    liveUrl: "#",
  },

  // {
  //   name: "Transcript & Original Document Acquisition System",
  //   desc: "A secure web-based platform that allows graduates to request, track, and receive official transcripts and original academic documents online from anywhere. It streamlines document requests, verification, approval workflows, and digital delivery between graduates and university administration.",
  //   tech: ["React", "Express", "MongoDB"],
  //   status: "In progress",
  //   images: [
  //     "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
  //     "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80",
  //   ],
  //   githubUrl: "https://github.com/Hailelove/original-tempo",
  //   liveUrl: "#",
  // },
];

// Reusable Interactive Card Component
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-xl dark:border-white/10 dark:bg-white/5"
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {/* Image Reveal Section */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.images[0]}
            alt={`${project.name} primary preview`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent dark:from-slate-950/80"></div>
        </div>
        {project.images[1] && (
          <div className="absolute top-0 right-0 h-full w-1/3 translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-l from-background/40 via-background/10 to-transparent dark:from-slate-950/40 dark:via-slate-950/10"></div>
            <img
              src={project.images[1]}
              alt={`${project.name} secondary preview`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-black/10 dark:ring-white/10"></div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6">
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-foreground dark:text-white">
              {project.name}
            </h3>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                project.status === "Live"
                  ? "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
                  : "border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400"
              }`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground dark:text-slate-300 mb-6 line-clamp-2">
            {project.desc}
          </p>
        </div>

        <div className="mt-auto">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-white/10 dark:text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-border dark:border-white/10">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                <FaGithub className="mr-2 w-4 h-4" /> Code
              </a>
            )}
            {project.liveUrl && project.status === "Live" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold text-primary hover:opacity-80 dark:text-cyan-300 dark:hover:text-cyan-200 transition-colors"
              >
                Live <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Featured Work">
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </motion.div>
    </Section>
  );
}
