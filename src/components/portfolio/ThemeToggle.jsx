import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  // 1. Lazy Initialization: This function only runs exactly once during the initial render.
  const [dark, setDark] = useState(() => {
    // Check if we are in a browser environment (important for SSR frameworks like Next.js)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true;
    }
    return true; // Default fallback
  });

  // 2. Synchronize external systems (the DOM) with React state
  useEffect(() => {
    // We remove the setState from here. This effect now solely handles applying the Tailwind class.
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]); // Runs whenever the 'dark' state changes

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-full border border-border bg-card/60 backdrop-blur p-2 hover:bg-accent/20 transition-colors"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
