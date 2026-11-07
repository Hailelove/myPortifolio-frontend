// import Section from "../ui/Section";

// const EXPERIENCE = [
//   {
//     role: " Full-Stack Developer",
//     company: "#",
//     time: "2023 — Present",
//     desc: "Lead development of scalable SaaS platforms serving 50k+ users. Architect REST/GraphQL APIs, mentor junior devs, and drive code quality.",
//   },
//   {
//     role: "Full-Stack Developer",
//     company: "#",
//     time: "#",
//     desc: "Built modular React frontends and Node.js microservices. Improved page load times by 60% and shipped 12+ production features.",
//   },
//   {
//     role: "Software Engineer",
//     company: "#",
//     time: "2019 — 2021",
//     desc: "Developed school and inventory management systems used by 20+ institutions across the region.",
//   },
// ];

// export default function Experience() {
//   return (
//     <Section id="experience" eyebrow="Experience" title="My career journey">
//       <div className="space-y-10">
//         {EXPERIENCE.map((exp, i) => (
//           <div
//             key={i}
//             className="flex flex-col md:flex-row gap-4 md:gap-8 border-b border-border pb-10 last:border-0 last:pb-0"
//           >
//             <div className="md:w-1/4 flex-shrink-0 text-sm text-muted-foreground font-medium mt-1">
//               {exp.time}
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold">{exp.role}</h3>
//               <p className="text-primary font-semibold mb-4 text-lg">
//                 {exp.company}
//               </p>
//               <p className="text-muted-foreground leading-relaxed">
//                 {exp.desc}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2 } from "lucide-react";
import Section from "../ui/Section";

const EXPERIENCE = [
  {
    role: "Bachelor of Science in Software Engineering",
    company: "School of Computing and Informatics, Wollo University",
    time: "2019 — 2023",
    icon: GraduationCap,
    desc: "Completed a comprehensive curriculum covering software development, algorithms, data structures, and web technologies. Graduated with honors and actively participated in research projects related to software engineering and web development.",
    skills: [
      "Software Development",
      "Algorithms",
      "Data Structures",
      "Web Technologies",
    ],
  },
  {
    role: "Lecturer & Software Engineer",
    company: "Mekdelam Amba University",
    time: "2024 — Present",
    icon: GraduationCap,
    desc: "Teaching software engineering courses, mentoring students, and conducting research in web development, software architecture, and emerging technologies.",
    skills: ["Software Engineering", "Teaching", "Mentoring", "Research"],
  },
  {
    role: "Project manager & Team Lead",
    company: "Mekdelam Amba University",
    time: "2024 — Present",
    icon: Code2,
    desc: "Led a team of developers in designing and implementing web-based applications, managing project timelines, and ensuring the delivery of high-quality software solutions, including a Laboratory Management System and a SACCO Management System for Mekdela Amba University.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Prisma"],
  },
  {
    role: "Department Head of Software Engineering",
    company: "Mekdelam Amba University",
    time: "2025 — Present",
    icon: Briefcase,
    desc: "Overseeing the software engineering department, managing faculty and staff, developing curriculum, and ensuring the department's alignment with industry standards and academic excellence.",
    skills: [
      "Leadership",
      "Curriculum Development",
      "Faculty Management",
      "Academic Excellence",
    ],
  },
  {
    role: "Full-Stack Software Developer ",
    company: "Farka Technology PLC",
    time: "2026 — present",
    icon: Briefcase,
    desc: "Developed and maintained web applications, enterprise management systems, and REST APIs. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    skills: ["React", "Node.js", "Express", "Asp .NET", "PostgreSQL"],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Professional Background"
      title="Experience & Career Journey"
    >
      <div className="relative mt-12 space-y-10">
        {/* Timeline Line */}
        <div className="absolute left-6 top-8 bottom-8 w-px bg-border md:left-[30%]" />

        {EXPERIENCE.map((exp) => {
          const Icon = exp.icon;

          return (
            <motion.div
              key={exp.role}
              {...fadeInUp}
              className="relative grid grid-cols-1 gap-5 md:grid-cols-[30%_1fr] md:gap-10"
            >
              {/* Timeline & Period */}
              <div className="flex items-start gap-5 md:justify-end">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm md:absolute md:left-[30%] md:-translate-x-1/2">
                  <Icon size={22} />
                </div>

                <div className="pt-1 md:pr-8 md:text-right">
                  <p className="text-sm font-semibold text-primary">
                    {exp.time}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {exp.company}
                  </p>
                </div>
              </div>

              {/* Experience Content */}
              <div className="ml-[68px] rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md md:ml-0 md:p-7">
                <h3 className="text-xl font-bold text-foreground">
                  {exp.role}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {exp.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary dark:bg-cyan-400/10 dark:text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
