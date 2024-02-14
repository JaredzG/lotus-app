import type { Config } from "drizzle-kit";
import "dotenv/config";

const URI = process.env.DB_URI;

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: URI,
  },
} satisfies Config;
