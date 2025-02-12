import { Hono } from "hono";
import { handleGoogleCallback } from "@/controllers/oauth.controller.ts";

const auth = new Hono();

auth.post("/google/callback", handleGoogleCallback);

export { auth };
