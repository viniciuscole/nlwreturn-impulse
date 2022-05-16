import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(private feedbacksRepository: FeedbacksRepository, private mailAdapter: MailAdapter){ 
    }

    async execute(data: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = data;

        await this.feedbacksRepository.create({ type, comment, screenshot });
        
        await this.mailAdapter.sendMail({
            subject: "New Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `<img src="${screenshot}" />`,
                `</div>`
            ].join('\n'),
        });
    }
}