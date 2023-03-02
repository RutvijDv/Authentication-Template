const nodemailer = require("nodemailer");
const { mailUsername, mailPassword } = require("../config/mail.config");

const sendMail = async (email, token, type) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: mailUsername, // generated ethereal user
      pass: mailPassword, // generated ethereal password
    },
  });

  let body, subject;

  if (type == "activation") {
    subject = "Activation";
    body =
      '<p>Click <a href="https://riacsvnit.in/auth/email?token=' +
      token +
      '">here</a> to activate your account</p>';
  } else if (type == "forget") {
    subject = "Reset Password";
    body =
      '<p>Click <a href="https://riacsvnit.in/auth/reset?token=' +
      token +
      '">here</a> to reset your password</p>';
  }

  const mailOptions = {
    from: "noreply <" + mailUsername + ">",
    to: email,
    subject: subject,
    html: body,
  };

  //Activation mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
