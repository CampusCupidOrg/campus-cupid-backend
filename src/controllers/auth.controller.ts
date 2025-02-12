import jwt, { type JwtPayload } from "jsonwebtoken";
import {
  createTransport,
  generateToken,
  getMailOptions,
} from "@/services/mailer.service.ts";
import { env } from "@/shared/env.ts";
import { errors } from "@/shared/errors.ts";
import type { ReturnRes } from "@/shared/response.ts";
import type { Context } from "hono";

export const login = async (c: Context) => {
  const body = await c.req.json();

  if (body.email === "") {
    return errors.get(400);
  }

  const token = generateToken(body.email);
  const link = `${env.APP_URL}/verify?token=${token}`;

  const mailRequest = getMailOptions(body.email, link);

  return createTransport().sendMail(mailRequest, (error) => {
    if (error) {
      return c.json(
        {
          status: 500,
          message: "Could not send email",
          prettyMessage: "An error occurred while sending the email.",
        },
        500
      );
    }
    const res: ReturnRes = {
      status: 200,
      message: "Email sent",
      prettyMessage: `Email sent to ${body.email}`,
    };
    return c.json(res, 200);
  });
};

export const verify = async (c: Context) => {
  const token = c.req.query('token');

  if (!token) {
    return errors.get(400);
  }

  let decodedToken: JwtPayload;
  try {
    decodedToken = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  } catch {
    return c.json({
      status: 401,
      message: "Invalid authentication credentials",
      prettyMessage: "Invalid authentication credentials",
    });
  }

  if (
    !Object.prototype.hasOwnProperty.call(decodedToken, "email") ||
    !Object.prototype.hasOwnProperty.call(decodedToken, "expirationDate")
  ) {
    return c.json({
      status: 401,
      message: "Invalid authentication credentials",
      prettyMessage: "Invalid authentication credentials",
    });
  }

  const { expirationDate } = decodedToken;
  if (expirationDate < new Date()) {
    return c.json({
      status: 401,
      message: "Token expired",
      prettyMessage: "Token expired",
    });
  }
  return c.json({
    status: 200,
    message: "Token verified",
    prettyMessage: "Token verified",
    data: {
      token: token
    }
  });
};
