/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

// Page Section Components
import Header from "../components/page/Header";
import Hero from "../components/page/Hero";
import Stats from "../components/page/Stats";
import Experience from "../components/page/Experience";
import About from "../components/page/About";
import Skills from "../components/page/Skills";
import Projects from "../components/page/Projects";
import Services from "../components/page/Services";
import Contact from "../components/page/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DemeBest" },
      {
        name: "description",
        content:
          "Portfolio of Deme Best — a full-stack developer building scalable web apps with React, Node.js, and PostgreSQL.",
      },
      { property: "og:title", content: "DemeBest" },
      {
        property: "og:description",
        content: "Building modern, user-centered web applications.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 gradient-bg origin-left z-50"
      />

      {/* Render layout top to bottom */}
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <Stats />
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <Projects />
      <div id="services">
        <Services />
      </div>
      {/* <Testimonials /> */}
      <div id="contact">
        <Contact />
      </div>
      {/* <Footer /> */}

      {/* Back to Top Floating Trigger */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full gradient-bg shadow-lg hover:opacity-90 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="text-primary-foreground h-6 w-6" />
        </button>
      )}
    </div>
  );
}
