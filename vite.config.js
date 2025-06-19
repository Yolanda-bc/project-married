import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "https://yolanda-bc.github.io/project-married/",
  plugins: [react()],
  server: {
    open: "/",
    watch: {
      usePolling: true,
    },
  },
});
