const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, templateName, replacements) => {
  try {
    const templatePath = path.join(
      __dirname,
      "email_templates",
      templateName
    );
    let html = fs.readFileSync(templatePath, "utf-8");

    // Replace placeholders
    Object.keys(replacements).forEach((key) => {
      html = html.replace(new RegExp(`#{${key}}`, "g"), replacements[key]);
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL || "noreply@bookmyshow.com",
      to: email,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.log("Email error:", error.message);
    return false;
  }
};

module.exports = sendEmail;
