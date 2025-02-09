type Env = {
    DATABASE_URL: string;
    JWT_SECRET: string;
    PORT: number;
}

export const loadEnv = (): Env => {
    const {
        DATABASE_URL,
        JWT_SECRET,
        PORT
    } = Bun.env;

    if (!DATABASE_URL) {
        throw new Error("DATABASE_URL is required");
    }

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is required");
    }

    if (!PORT) {
        throw new Error("PORT is required");
    }

    return {
        DATABASE_URL,
        JWT_SECRET,
        PORT: Number.parseInt(PORT)
    } satisfies Env;
}

export const env = loadEnv();