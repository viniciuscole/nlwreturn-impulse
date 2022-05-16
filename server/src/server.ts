import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "eebbef6838db1a",
      pass: "6058c6b4c0c6a2"
    }
  });

app.use(express.json());

app.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body;
    
    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Diego Fernandes <viniamorim87@hotmail.com>',
        subject: 'Feedback do usuário',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `<img src="${screenshot}" />`,
            `</div>`
        ].join('\n'),
    })
    
    return res.status(201).json({data:feedback})
});

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
