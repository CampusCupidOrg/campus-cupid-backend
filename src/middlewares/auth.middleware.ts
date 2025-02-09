import { env } from "@/shared/env.ts";
import type { Context } from "hono";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (c: Context) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader) {
        return c.json({
            status: 401,
            message: "Unauthorized",
            prettyMessage: "You are not authorized to access this resource"
        }, 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return c.json({
            status: 401,
            message: "Unauthorized",
            prettyMessage: "You are not authorized to access this resource"
        }, 401);
    }

    try {
        const decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        const email = decodedToken.email;
        const expirationDate = decodedToken.expirationDate;
        c.set("email", email);
        c.set("expirationDate", expirationDate);
    } catch {
        return c.json({
            status: 401,
            message: "Unauthorized",
            prettyMessage: "You are not authorized to access this resource"
        }, 401);
    }
}