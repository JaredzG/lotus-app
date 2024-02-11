import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import "dotenv/config";

const HOST = process.env.SITE_HOST;
const PORT = parseInt(process.env.SITE_PORT);

// https://astro.build/config
export default defineConfig({
  server: {
    host: HOST,
    port: PORT,
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: "server",
  adapter: vercel(),
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
  image: {
    domains: ["amazonaws.com", "cloudfront.net"],
  },
});
