/* eslint-disable react-refresh/only-export-components */

import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronUp } from "lucide-react";

// Global Layout Components
import Header from "../components/page/Header";
import Footer from "../components/page/Footer";
import { reportError } from "../components/lib/error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Deme Best — Full-Stack Developer & Software Engineer",
      },
      {
        name: "description",
        content:
          "Portfolio of Deme Best, a full-stack developer specializing in React, Node.js, and scalable web applications.",
      },
      { name: "author", content: "Deme Best" },
      {
        property: "og:title",
        content: "Deme Best — Full-Stack Developer",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Deme Best, a full-stack developer specializing in React, Node.js, and scalable web applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "stylesheet", href: "/src/styles.css" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }) {
  return <div>{children}</div>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  // Check if current route is under /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Layout and scroll mechanics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`min-h-dvh bg-background text-foreground ${isAdminRoute ? "" : "pt-16"}`}
      >
        {/* Render header, scrollbar, and footer ONLY for non-admin pages */}
        {!isAdminRoute && (
          <>
            <motion.div
              style={{ scaleX }}
              className="fixed top-0 left-0 right-0 h-1 gradient-bg origin-left z-50"
            />
            <Header />
          </>
        )}

        <main>
          <Outlet />
        </main>

        {!isAdminRoute && <Footer />}

        {/* Back to Top Floating Action Button */}
        {!isAdminRoute && showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 p-3 rounded-full gradient-bg shadow-lg hover:opacity-90 transition-all z-50"
            aria-label="Scroll to top"
          >
            <ChevronUp className="text-primary-foreground h-6 w-6" />
          </button>
        )}
      </div>
    </QueryClientProvider>
  );
}
