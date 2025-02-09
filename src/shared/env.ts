type Env = {
    APP_URL: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    PORT: number;
    EMAIL: string;
    EMAIL_PASSWORD: string;
}

export const loadEnv = (): Env => {
    const {
        APP_URL,
        DATABASE_URL,
        JWT_SECRET,
        PORT,
        EMAIL,
        EMAIL_PASSWORD
    } = process.env;

    if (!APP_URL) {
        throw new Error("APP_URL is required");
    }

    if (!DATABASE_URL) {
        throw new Error("DATABASE_URL is required");
    }

    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is required");
    }

    if (!PORT) {
        throw new Error("PORT is required");
    }

    if (!EMAIL) {
        throw new Error("EMAIL is required");
    }

    if (!EMAIL_PASSWORD) {
        throw new Error("EMAIL_PASSWORD is required");
    }

    return {
        APP_URL,
        DATABASE_URL,
        JWT_SECRET,
        PORT: Number.parseInt(PORT),
        EMAIL,
        EMAIL_PASSWORD
    } satisfies Env;
}

export const env = loadEnv();