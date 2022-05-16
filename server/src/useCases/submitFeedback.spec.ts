import { SubmitFeedbackUseCase } from "./submitFeedback";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase({create: createFeedbackSpy}, {sendMail: sendMailSpy});

describe('Submite feedbck', () => {
    it('should be able to submit feedback', async () => {
        await expect(submitFeedback.execute({type: "bug", comment: "teste", screenshot:"data:image/png;base64/test.jpg"})).resolves.not.toThrow();
        
        expect(createFeedbackSpy).toHaveBeenCalled;
        expect(sendMailSpy).toHaveBeenCalled;
    });
    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({type: "", comment: "teste", screenshot:"data:image/png;base64/test.jpg"})).rejects.toThrow();
    });
    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({type: "bug", comment: "", screenshot:"data:image/png;base64/test.jpg"})).rejects.toThrow();
    });
    it('should not be able to submit feedback with wrong image format', async () => {
        await expect(submitFeedback.execute({type: "bug", comment: "teste", screenshot:"test.jpg"})).rejects.toThrow();
    });
});