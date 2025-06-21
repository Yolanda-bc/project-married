import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  //esto hace que funcione en local como en github page
  base: mode === "production" ? "project-married/" : "/",
  plugins: [react()],
  server: {
    open: "/",
    watch: {
      usePolling: true,
    },
  },
}));
