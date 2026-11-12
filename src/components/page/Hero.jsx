import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa"; //FaTwitter
import { Send } from "lucide-react";
import profileAsset from "../../assets/profile.png";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-bg relative min-h-screen md:min-h-dvh w-full flex items-center justify-center pt-16 overflow-hidden px-6"
    >
      {/* Dynamic Background Glow Ring */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-3xl opacity-30 animate-pulse pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 py-12">
        {/* Left Column: Text & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
            Hi, I'm <span className="gradient-text">Demeke Molla</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium max-w-xl mx-auto md:mx-0">
            Full-Stack Developer - Lecturer · UI/UX Enthusiast
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              href="/cv.pdf"
              download="cv.pdf"
              className="px-6 py-3 rounded-full gradient-bg text-primary-foreground font-medium shadow-elegant hover:opacity-90 transition"
            >
              Download CV
            </a>
            <a
              href="#projects"
              className="px-6 py-3 border border-border rounded-full font-medium hover:bg-muted/50 transition"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-border rounded-full font-medium hover:bg-muted/50 transition"
            >
              Contact
            </a>
            {/* <a
              href="https://yourwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border rounded-full font-medium hover:bg-muted/50 transition"
            >
              Visit Profile
            </a> */}
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-6 mt-8 text-muted-foreground">
            <a
              href="https://github.com/Hailelove"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-all duration-300 hover:text-primary hover:-translate-y-1"
            >
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/deme-best-51840a242/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-all duration-300 hover:text-primary hover:-translate-y-1"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>

            {/* <a
              href="https://twitter.com/demeke"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="transition-all duration-300 hover:text-primary hover:-translate-y-1"
            >
              <FaTwitter className="h-6 w-6" />
            </a> */}
            <a
              href="https://t.me/Seif_atira"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="transition-all duration-300 hover:text-primary hover:-translate-y-1"
            >
              <Send className="h-6 w-6" />
            </a>
            {/* <a
              href="https://yourwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profile"
              className="transition-all duration-300 hover:text-primary hover:-translate-y-1"
            >
              Visit profile
            </a> */}
          </div>
        </motion.div>

        {/* Right Column: Profile Image Layout */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          className="relative flex items-center justify-center"
        >
          {/* Inner Glow Layer */}
          <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-40 animate-pulse" />

          {/* Floating border animation wrapper */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative p-1.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl"
          >
            <img
              src={profileAsset}
              alt="Demeke Molla"
              className="w-56 h-56 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-white dark:border-zinc-900 transition-transform duration-300"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
