import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(), // This plugin automatically generates the route tree!
  ],
});
