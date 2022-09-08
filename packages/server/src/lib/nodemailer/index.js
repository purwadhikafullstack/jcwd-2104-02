require('dotenv').config();
const nodemailer = require('nodemailer');

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, CLIENT_EMAIL } = process.env;

const courier = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: CLIENT_EMAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

const sendMail = async ({ email, token }) => {
  const mail = {
    from: `DEVELOPER TEAM <${CLIENT_EMAIL}>`,
    to: email,
    subject: 'Please Verify Yourself',
    html: `<h1>Hello, Please Click this <a href="http://localhost:8000/users/verification/${token}">link</a> to verify</h1>`,
  };

  try {
    await courier.sendMail(mail);
  } catch (error) {
    throw error;
  }
};

const sendResetPasswordMail = async ({ email, token }) => {
  const mail = {
    from: `DEVELOPER TEAM <${CLIENT_EMAIL}>`,
    to: email,
    subject: 'Password Reset',
    html: `<h1>Hello, Please Click this <a href="http://localhost:3000/resetPassword/${token}">link</a> to reset your password</h1>`,
  };

  try {
    await courier.sendMail(mail);

    console.log(`reset password mail sent fot ${email}`);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendMail, sendResetPasswordMail };
