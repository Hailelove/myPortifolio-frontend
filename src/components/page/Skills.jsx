import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench } from "lucide-react";
import Section from "../ui/Section";

// Map categories to specific icons
const CATEGORY_ICONS = {
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  "Tools & Design": Wrench,
};

// Updated to reflect a robust MERN and Java architecture stack
const SKILLS = {
  Frontend: [
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "Java Swing",
    "HTML5 / CSS3",
  ],
  Backend: ["Node.js", "Express.js", "Java", "Servlets", "NestJS"],
  Database: ["MongoDB", "MySQL", "PostgreSQL", "JDBC"],
  "Tools & Design": [
    "Git & GitHub",
    "UML Modeling",
    "Docker",
    "Postman",
    "VS Code",
  ],
};

// Animation Variants
const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const tagVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Expertise" title="My Tech Stack">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        {Object.entries(SKILLS).map(([category, skills]) => {
          const Icon = CATEGORY_ICONS[category] || Wrench;

          return (
            <motion.div
              key={category}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 shadow-sm transition-colors hover:border-primary/50 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/30 overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/5" />

              <div className="relative z-10">
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground dark:bg-white/10 dark:text-cyan-400 dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-900">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-cyan-300">
                    {category}
                  </h3>
                </div>

                {/* Skills Interactive Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={tagVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="cursor-default rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-cyan-500/30 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
