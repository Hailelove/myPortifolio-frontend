import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
          {eyebrow}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}
