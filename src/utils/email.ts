

// import nodemailer from 'nodemailer';

// export async function sendVerificationEmail(email: string, code: string) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: false,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"Your App" <${process.env.SMTP_USER}>`,
//     to: email,
//     subject: 'Your Verification Code',
//     text: `Your verification code is ${code}`,
//   });
// }






import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendVerificationEmail = async (to: string, code: string) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL!,
    subject: 'Your Verification Code',
    text: `Your verification code is ${code}`,
  };
  await sgMail.send(msg);
  console.log(`📧 Verification code sent to ${to}: ${code}`);
};
