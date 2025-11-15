import nodemailer from "nodemailer";
import fs from "fs";
import { ApiError } from "./ApiError.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendEmail = async (subject, otp, to) => {
  let html = fs.readFileSync(path.join(process.cwd(), "email.html"), "utf8");

  html = html.replace("{{OTP_CODE}}", otp);
  try {
    return await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html,
    });
  } catch (error) {
    return null;
  }
};
