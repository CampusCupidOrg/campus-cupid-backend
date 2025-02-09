import { env } from "@/shared/env.ts";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const createTransport = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL,
      pass: env.EMAIL_PASSWORD,
    },
  });
};

export const generateToken = async (email: string) => {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 30);
  return jwt.sign({ email, expirationDate }, env.JWT_SECRET);
};

export const getMailOptions = (email: string, link: string) => {
  let body = `
        <h2>Hey ${email}</h2>
        <p>Login to your account by clicking the link below...</p>
        <p>${link}</p>
        <p>Please note that for added security this link becomes invalid after 30 minutes.</p>
        <p>If you did not request this link, please ignore this email.</p>
    `;

  return {
    body,
    subject: "Login to Campus Cupid",
    to: email,
    html: body,
    from: env.EMAIL,
  };
};

export const inviteToApp = async (email: string) => {
  const link = `${env.APP_URL}/signup`;
  let mailRequest = getMailOptions(email, link);

  const body = `
        <h2>Hey ${email}</h2>
        <p>Join Campus Cupid by clicking the link below...</p>
        <p>${link}</p>
        <p>If you did not request this link, please ignore this email.</p>
  `;

    mailRequest.body = body;
    mailRequest.html = body;

    return createTransport().sendMail(mailRequest, (error) => {
        if (error) {
            return {
                status: 500,
                message: "Could not send email",
                prettyMessage: "An error occurred while sending the email."
            }
        } else {
            return {
                status: 200,
                message: "Email sent",
                prettyMessage: `Email sent to ${email}`
            }
        }
    });
};

const createBody = (email: string, crush: string) => {
    return `
        <h2>Hey ${email}</h2>
        <p>You and ${crush} have a crush on each other!</p>
        <p>Good luck!</p>
    `
}

export const mailResultsSvc = async(email1: string, email2: string) => {
    let mail1Body = createBody(email1, email2);
    let mail2Body = createBody(email2, email1);

    let mail1Request = getMailOptions(email1, mail1Body);
    let mail2Request = getMailOptions(email2, mail2Body);

    createTransport().sendMail(mail1Request, (error) => {
        if (error) {
            return {
                status: 500,
                message: "Could not send email",
                prettyMessage: "An error occurred while sending the email."
            }
        }
    });

    createTransport().sendMail(mail2Request, (error) => {
        if (error) {
            return {
                status: 500,
                message: "Could not send email",
                prettyMessage: "An error occurred while sending the email."
            }
        }
    });

    return {
        status: 200,
        message: "Emails sent",
        prettyMessage: "Emails sent successfully"
    }
}