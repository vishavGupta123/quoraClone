const nodemailer = require("../config/nodemailer");

//this is another way of exporting a method
exports.newAnswer = (answer) => {
  let htmlString = nodemailer.renderTemplate(
    { answer: answer },
    "/answers/new_answer.ejs"
  );
  console.log("inside new answer mailer");
  nodemailer.transporter.sendMail(
    {
      from: "vishavgupta6023@gmail.com",
      to: answer.user.email,
      subject: "New answer published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("error in sending mail", err);
        return;
      }
      console.log("Message sent", info);
      return;
    }
  );
};
