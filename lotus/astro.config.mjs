import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

const HOST = process.env.SITE_HOST ?? "0.0.0.0";
const PORT = parseInt(process.env.SITE_PORT ?? "3000");

// https://astro.build/config
export default defineConfig({
  server: {
    host: HOST,
    port: PORT,
  },
  output: "server",
  adapter: netlify(),
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
  integrations: [react()]
});