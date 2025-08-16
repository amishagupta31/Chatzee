// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // keep frontend assets path correct
  server: {
    proxy: {
      "/api": {
        target: "https://chatzee-xsx3.onrender.com", // your Render backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
