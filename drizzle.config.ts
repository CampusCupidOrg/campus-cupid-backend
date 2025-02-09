import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "src/database/schema",
    out: "drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: Bun.env.DATABASE_URL!,
    }
})