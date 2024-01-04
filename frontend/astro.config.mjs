import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import react from "@astrojs/react";

const HOST = process.env.SITE_HOST ?? "0.0.0.0";
const PORT = parseInt(process.env.port ?? "3000");

// https://astro.build/config
export default defineConfig({
  server: {
    host: HOST,
    port: PORT,
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    server: {
      host: true,
      hmr: {
        clientPort: PORT,
      },
      port: PORT,
      watch: {
        usePolling: true,
      },
    },
  },
  integrations: [react()],
});
