const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const SibV3 = require('sib-api-v3-sdk');

const fs = require('fs');

const sendMail = async (username, receiver, url, type_of_action, action_description = " ") => {
  SibV3.ApiClient.instance.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

  let response = {
    acceptedMail: [],
    err: "NULL"
  }

  try {
    const html = fs.readFileSync(__dirname + '\\pages\\emailTemplate.html', { encoding: 'utf-8' });
    const template = handlebars.compile(html);
    const replacements = {
      username,
      type_of_action,
      action_description,
      address: "Surat | Ahmedabad | Lucknow",
      url
    };
    const htmlToSend = template(replacements);
    const res = await new SibV3.TransactionalEmailsApi().sendTransacEmail({
      'subject': type_of_action,
      'sender': {
        'email': process.env.NODEMAILER_EMAIL,
        'name': process.env.NODEMAILER_SENDER_NAME,
      },
      'replyTo': {
        'email': process.env.NODEMAILER_REPLY_TO_EMAIL,
        'name': process.env.NODEMAILER_REPLY_TO_NAME,
      },
      'to': [{
        'name': username,
        'email': receiver,
      }],
      'htmlContent': htmlToSend,
      'params': {
        'bodyMessage': action_description
      }
    });
    console.log(res)
    return response;
  } catch (error) {
    response.err = error;
    console.log(error)
    return response;
  }
};


module.exports = sendMail;