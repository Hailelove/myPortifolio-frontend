import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // 1. Lazy Initialization: Calculate the screen size exactly once on mount
  const [isMobile, setIsMobile] = React.useState(() => {
    // Check if window exists to prevent crashes during SSR (like Next.js)
    if (typeof window !== "undefined") {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return undefined;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);

    // 2. We removed the synchronous setIsMobile call that was causing the error here!

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
