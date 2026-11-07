// import { motion } from "framer-motion";
// import {
//   Code2,
//   Database,
//   Wrench,
//   Layers,
//   Briefcase,
//   Award,
// } from "lucide-react";
// import Section from "../ui/Section";

// // Animation Variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 40 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
// };

// const stagger = {
//   animate: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const SERVICES = [
//   {
//     icon: Code2,
//     title: "Web Development",
//     desc: "Modern, responsive websites and SPAs built with React and Next.js.",
//   },

//   {
//     icon: Wrench,
//     title: "UI/UX/Figma Design",
//     desc: "User-centered interfaces that balance beauty and usability.",
//   },
//   {
//     icon: Database,
//     title: "Database Design",
//     desc: "Optimized schemas for PostgreSQL, MySQL, and MongoDB.",
//   },
//   {
//     icon: Briefcase,
//     title: "API Development",
//     desc: "Robust REST and GraphQL APIs with Node.js, Express, and NestJS.",
//   },
//   {
//     icon: Award,
//     title: "System Analysis",
//     desc: "Architecture, planning, and technical consulting for complex systems.",
//   },
//   {
//     icon: Layers,
//     title: "Mobile App Development",
//     desc: "Cross-platform mobile apps using React Native.",
//   },
// ];

// export default function Services() {
//   return (
//     <Section id="services" eyebrow="Services" title="What I do">
//       <motion.div
//         className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12"
//         variants={stagger}
//         initial="initial"
//         whileInView="animate"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         {SERVICES.map((service, i) => {
//           const Icon = service.icon;
//           return (
//             <motion.div
//               key={i}
//               variants={fadeInUp}
//               whileHover={{ y: -8 }}
//               transition={{ type: "spring", stiffness: 300, damping: 20 }}
//               className="group relative p-8 rounded-3xl border border-border bg-card shadow-sm transition-colors hover:border-primary/50 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/30 overflow-hidden"
//             >
//               {/* Subtle background gradient reveal on hover */}
//               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/5" />

//               <div className="relative z-10">
//                 {/* Icon Container with color inversion on hover */}
//                 <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25 dark:bg-white/10 dark:group-hover:bg-cyan-500">
//                   <Icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground dark:text-cyan-400 dark:group-hover:text-slate-900" />
//                 </div>

//                 {/* Text Content */}
//                 <h3 className="text-xl font-bold mb-3 text-foreground transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-cyan-300">
//                   {service.title}
//                 </h3>
//                 <p className="text-muted-foreground dark:text-slate-300 leading-relaxed transition-colors duration-300">
//                   {service.desc}
//                 </p>
//               </div>
//             </motion.div>
//           );
//         })}
//       </motion.div>
//     </Section>
//   );
// }

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Wrench,
  Layers,
  Briefcase,
  Award,
  Monitor,
  Workflow,
  FileText,
  GitBranch,
  TestTube,
  Building2,
  ShoppingCart,
  GraduationCap,
  Cloud,
  Settings,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Section from "../ui/Section";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Responsive websites and web applications built with React and Next.js.",
  },
  {
    icon: Building2,
    title: "Enterprise Systems",
    desc: "Custom ERP, HR, finance, inventory, SACCO, and management solutions.",
  },
  {
    icon: Workflow,
    title: "Odoo ERP Solutions",
    desc: "Odoo implementation, module customization, integrations, and workflow automation.",
  },
  {
    icon: Wrench,
    title: "UI/UX Design",
    desc: "Intuitive interfaces, wireframes, and interactive prototypes using Figma.",
  },
  {
    icon: Database,
    title: "Database Management",
    desc: "Database architecture, optimization, administration, and data security.",
  },
  {
    icon: Briefcase,
    title: "Backend & API Development",
    desc: "Scalable REST APIs and backend services using Node.js and Express.js.",
  },
  {
    icon: Award,
    title: "System Analysis & Consulting",
    desc: "Requirements engineering, software architecture, and technical consulting.",
  },
  {
    icon: Layers,
    title: "Mobile App Development",
    desc: "Cross-platform mobile applications using React Native.",
  },
  {
    icon: Monitor,
    title: "Desktop Development",
    desc: "Business desktop applications for data processing and management.",
  },
  {
    icon: TestTube,
    title: "Software Testing & QA",
    desc: "Manual testing, automation, API testing, debugging, and quality assurance.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    desc: "Online stores with product, inventory, order, and payment management.",
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    desc: "Application hosting, server configuration, CI/CD, and deployment automation.",
  },
  {
    icon: GitBranch,
    title: "DevOps & CI/CD",
    desc: "Git workflows, automated builds, testing, and continuous deployment.",
  },
  {
    icon: Settings,
    title: "System Maintenance",
    desc: "Bug fixing, software updates, troubleshooting, and performance optimization.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    desc: "Application security, authentication, access control, and data protection.",
  },
  {
    icon: Smartphone,
    title: "Business Automation",
    desc: "Workflow automation, system integrations, and automated notifications.",
  },
  {
    icon: GraduationCap,
    title: "Online IT Training",
    desc: "Practical training in programming, web development, databases, and software engineering.",
  },
  {
    icon: FileText,
    title: "Technical Documentation",
    desc: "Software specifications, system documentation, technical reports, and proposals.",
  },
];

export default function Services() {
  return (
    <Section id="services" eyebrow="Services" title="What I Do">
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mt-12"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
      >
        {SERVICES.map((service) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 22,
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-400/40"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary dark:bg-white/10 dark:group-hover:bg-cyan-500">
                  <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground dark:text-cyan-400 dark:group-hover:text-slate-900" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-cyan-300">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
