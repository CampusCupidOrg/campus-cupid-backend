import { env } from "@/shared/env.ts";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "src/database/schema",
    out: "drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    }
})