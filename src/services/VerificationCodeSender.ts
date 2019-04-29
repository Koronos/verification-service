import _ from "lodash";

export interface DataForSendCode {
    code: string;

    [propName: string]: any;
}

export interface VerificationCodeSenderIterface {
    canHandle(data: DataForSendCode): boolean;

    sendNotification(data: DataForSendCode): void;
}

export class SMSSender implements VerificationCodeSenderIterface {
    canHandle(data: DataForSendCode): boolean {
        return _.has(data, "code") && _.has(data, "phoneNumber");
    }

    sendNotification(data: DataForSendCode): void {
        /* Well... maybe this could be a service that implements twilio to send the SMS, but I don't have an account D:
           soo for that this is going to be a fake service that never works :c, don't kill me please D: */
        throw Error("Error sending code");
    }
}

export class ConsoleSender implements VerificationCodeSenderIterface {
    canHandle(data: DataForSendCode): boolean {
        return _.has(data, "code");
    }

    sendNotification(data: DataForSendCode): void {
        console.log(`Hi! Your verification code for Rever is ${data.code}`);
    }
}

export class VerificationCodeSender {
    senders: VerificationCodeSenderIterface[] = [];

    registerSender(sender: VerificationCodeSenderIterface) {
        this.senders.push(sender);
    }

    sendNotification(data: DataForSendCode) {
        const sender = this.senders.find(sender => {
            try {
                if (sender.canHandle(data)) {
                    sender.sendNotification(data);
                    return true;
                }
            } catch (e) {
            }
            return false;
        });

        if (!sender) throw Error("Notification cannot be send");
    }
}

const verificationCodeSender = new VerificationCodeSender();

verificationCodeSender.registerSender(new SMSSender());
verificationCodeSender.registerSender(new ConsoleSender());

export default verificationCodeSender;