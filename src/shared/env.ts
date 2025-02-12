import * as dotenv from 'dotenv';
dotenv.config();

type Env = {
    APP_URL: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    PORT: number;
    EMAIL?: string;
    EMAIL_PASSWORD?: string;
    OAuth: {
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
    };
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

    if (!process.env.GOOGLE_CLIENT_ID) {
        throw new Error("GOOGLE_CLIENT_ID is required");
    }

    return {
        APP_URL,
        DATABASE_URL,
        JWT_SECRET,
        PORT: Number.parseInt(PORT),
        EMAIL: EMAIL || undefined,
        EMAIL_PASSWORD: EMAIL_PASSWORD || undefined,
        OAuth: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || ""
        }
    } satisfies Env;
}

export const env = loadEnv();