import nodemailer from "nodemailer";
import {domain} from '../config/auth.config'
import {mailUsername, mailPassword} from '../config/mail.config';

export const sendMail = async (name:string, receiverMail: string, token: string, type: string): Promise<void> => {

  try{
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: mailUsername, // generated ethereal user
        pass: mailPassword, // generated ethereal password
      },
    });
        
    let body, subject;
  
    if(type == "activation"){
      subject = "Activation"
      body = '<p>Click <a href="'+domain+'/auth/email?token=' + token + '">here</a> to activate your account</p>'
    }
    else if(type == "forget"){
      subject = "Reset Password"
      body = '<p>Click <a href="'+domain+'/auth/reset?token=' + token + '">here</a> to reset your password</p>'
        }
  
      const mailOptions = {
        from: "noreply <"+mailUsername+">",
        to: receiverMail,
        subject: subject,
        html: body,
      };
  
      //Activation mail
      await transporter.sendMail(mailOptions);

  } catch(err){
    console.log(err);
    throw "Can not send email";
  }
};