import type { Context } from "hono";
import type { ReturnRes } from "@/shared/response.ts";
import jwt from "jsonwebtoken";
import { env } from "@/shared/env.ts";

export const handleGoogleCallback = async (c: Context) => {
  const { email, name, picture } = await c.req.json();

  if (!email || !name) {
    return c.json({
      status: 400,
      message: "Missing required fields",
      prettyMessage: "Email and name are required",
    }, 400);
  }

  // Generate JWT token for the user
  const token = jwt.sign(
    { email, name },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const res: ReturnRes = {
    status: 200,
    message: "Authentication successful",
    prettyMessage: "Successfully authenticated with Google",
    data: {
      token,
      user: {
        email,
        name,
        picture
      }
    }
  };

  return c.json(res, 200);
};
