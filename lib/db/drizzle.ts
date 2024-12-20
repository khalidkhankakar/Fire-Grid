import * as schema from './schemas'
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

import env from "@/env";


config({path:'.env'})

if (!env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is not set');
  }

export const client = neon(env.POSTGRES_URL);

export const db = drizzle(client,{ schema });


