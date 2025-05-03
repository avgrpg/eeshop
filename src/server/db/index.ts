// import { drizzle } from 'drizzle-orm/vercel-postgres';
// import { sql } from "@vercel/postgres";

import * as schema from './schema';

// // Use this object to send drizzle queries to your DB
// export const db = drizzle(sql, { schema });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";

const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema });
