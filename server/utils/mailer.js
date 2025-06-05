const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     
    pass: process.env.EMAIL_PASS     
  }
});

const sendMail = async ({ to, subject , otp }) => {
  try {
    const html = otpEmailTemplate(otp);
    const info = await transporter.sendMail({
      from: `"Members only" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (err) {
    console.error('Email send error:', err);
    throw err;
  }
};


const otpEmailTemplate = (otp) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #2c3e50; text-align: center;">Your Verification Code</h2>
    
    <p style="font-size: 16px; color: #333; text-align: center;">
      Use the following One-Time Password (OTP) to verify your email address:
    </p>
    
    <div style="font-size: 32px; font-weight: bold; color: #000; text-align: center; margin: 30px 0;">
      ${otp}
    </div>

    <p style="font-size: 14px; color: #666; text-align: center;">
      This code will expire in 5 minutes. Do not share it with anyone.
    </p>

    <hr style="border: none; border-top: 1px solid #eaeaea; margin: 40px 0;">

    <p style="font-size: 12px; color: #aaa; text-align: center;">
      &copy; ${new Date().getFullYear()} Members Only. All rights reserved.
    </p>
  </div>
`;



module.exports = sendMail;
