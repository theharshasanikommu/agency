import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, html }) => {
  try {
    // Basic validation: do nothing if mail config isn't present
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email configuration missing — skipping sendEmail');
      return;
    }

    const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
    const secure = port === 465; // true for 465, false for other ports

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port,
      secure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email error:', error);
    // don't rethrow so that non-critical email failures don't break lead creation
  }
};
