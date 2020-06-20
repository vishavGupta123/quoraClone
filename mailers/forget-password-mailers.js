const nodemailer = require("../config/nodemailer");

exports.forgetPassword = (accessToken, user) => {
  console.log("This is access token", accessToken);
  console.log("this is user", user.email);
  nodemailer.transporter.sendMail(
    {
      from: "vishavgupta6023@gmail.com",
      to: user.email,
      subject: "Reset password link",
      html:
        '<p>Click <a href="http://localhost:8000/users/reset-password/' +
        accessToken.accessToken +
        '">here</a> to reset your password</p>',
    },
    (err, info) => {
      if (err) {
        console.log("error in sending email", err);
        return;
      }
      console.log("message sent", info);
      return;
    }
  );
};
