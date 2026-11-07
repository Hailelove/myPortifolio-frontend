import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "../portfolio/ThemeToggle";
import { Link } from "@tanstack/react-router";

const NAV = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Services", "#services"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-lg bg-background/70 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="#" className="font-bold text-lg z-50">
          <span className="gradient-text">Deme</span>.dev
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {NAV.map(([label, id]) => (
            <li key={id}>
              <a
                href={id}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 z-50">
          <ThemeToggle />

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full gradient-bg text-primary-foreground px-4 py-2 text-sm font-medium shadow-elegant hover:opacity-90 transition"
          >
            Hire me <ArrowRight className="h-4 w-4" />
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg md:hidden"
          >
            <ul className="flex flex-col px-6 py-6 space-y-6">
              {NAV.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={id}
                    onClick={closeMenu}
                    className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}

              {/* Mobile 'Hire me' button (Visible only on very small screens < 640px) */}
              <li className="pt-4 border-t border-border sm:hidden">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full rounded-full gradient-bg text-primary-foreground px-4 py-3 text-base font-medium shadow-elegant hover:opacity-90 transition"
                >
                  Hire me <ArrowRight className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
