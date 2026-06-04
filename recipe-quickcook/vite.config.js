import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 允許 Vercel 沙盒 dev 預覽網域（*.vercel.run）存取 dev server
  server: { allowedHosts: [".vercel.run"] },
  preview: { allowedHosts: [".vercel.run"] },
});
