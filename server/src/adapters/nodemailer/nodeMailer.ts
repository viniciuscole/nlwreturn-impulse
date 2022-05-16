import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "eebbef6838db1a",
      pass: "6058c6b4c0c6a2"
    }
  });


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Diego Fernandes <viniamorim87@hotmail.com>',
            subject,
            html: body,
        })
    };
}