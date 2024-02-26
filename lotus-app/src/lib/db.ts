import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../drizzle/schema";

const URI = process.env.DB_URI ?? "";

export const client = postgres(URI, { prepare: false });

export const db = drizzle(client, { schema });
