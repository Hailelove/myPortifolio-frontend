// import Section from "../ui/Section";

// export default function About() {
//   return (
//     <Section id="#about" eyebrow="About" title="A bit about me">
//       <p className="text-muted-foreground max-w-2xl text-lg">
//         Full-Stack Developer specializing in modern web applications using the
//         MERN stack. Passionate about building scalable solutions, solving
//         real-world problems, and continuously learning emerging technologies to
//         create impactful digital experiences.
//       </p>
//     </Section>
//   );
// }

import { motion } from "framer-motion";
import Section from "../ui/Section";

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title="Building Technology. Sharing Knowledge. Solving Problems."
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl space-y-5"
      >
        <p
          style={{ textAlign: "justify", textAlignLast: "left" }}
          className="text-lg leading-relaxed text-muted-foreground"
        >
          I am a Software Developer and University Lecturer specializing in
          full-stack development, software engineering, and enterprise
          solutions. I design and develop modern, scalable applications that
          address real-world challenges and improve organizational efficiency.
        </p>

        <p
          style={{ textAlign: "justify", textAlignLast: "left" }}
          className="text-lg leading-relaxed text-muted-foreground"
        >
          My technical expertise includes React, TypeScript, Node.js,
          PostgreSQL, database design, API development, and Odoo ERP
          customization. I also work in system analysis, software testing,
          deployment, and business process automation.
        </p>

        <p
          style={{ textAlign: "justify", textAlignLast: "left" }}
          className="text-lg leading-relaxed text-muted-foreground"
        >
          Beyond development, I am passionate about teaching, mentoring aspiring
          developers, sharing technical knowledge, and exploring emerging
          technologies to create meaningful digital solutions.
        </p>
      </motion.div>
    </Section>
  );
}
