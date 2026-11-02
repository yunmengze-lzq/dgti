import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "./",
  server: {
    fs: { deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "**/var/**", "**/*.sqlite*"] },
    watch: { ignored: ["**/var/**", "**/*.sqlite*"] }
  },
  plugins: [react(), {
    name: "dgti-local-api",
    async configureServer(server) {
      const { createApi } = await import("./server/api.js");
      const api = createApi();
      server.middlewares.use(api.handler);
      server.httpServer?.once("close", api.close);
    }
  }]
});
