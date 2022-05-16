import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodeMailer';
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedback';

export const routes = express.Router();


routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body;
    
    const PrismaFeedbacksRepository = new PrismaFeedbackRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(PrismaFeedbacksRepository, nodemailerMailAdapter);

    await submitFeedbackUseCase.execute({type, comment, screenshot});
    

    return res.status(201).send();
    
    
});