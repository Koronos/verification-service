import { VerificationCode } from "../entities/VerificationCode";

export class VerificationCodeGeneratorService {
    async generateUniqueCode() {
        const randomNumber = VerificationCodeGeneratorService.getRandomNumber();

        let isRegistered = true;
        while (isRegistered) {
            const verificationCodes = await VerificationCode.findAll({
                where: {
                    "code": randomNumber
                }
            });
            isRegistered = verificationCodes.length > 0;
        }
        return randomNumber;
    }

    private static getRandomNumber(): string {
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        return ("000" + randomNumber).slice(-4);
    }
}

export default new VerificationCodeGeneratorService();