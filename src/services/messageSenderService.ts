import _ from "lodash";

export interface DataForSendMessage {
    message: string;

    [propName: string]: any;
}

export interface MessageSenderInterface {
    canHandle(data: DataForSendMessage): boolean;

    sendNotification(data: DataForSendMessage): void;
}

export class SMSSender implements MessageSenderInterface {
    canHandle(data: DataForSendMessage): boolean {
        return _.has(data, "message") && _.has(data, "phoneNumber");
    }

    sendNotification(data: DataForSendMessage): void {
        /* Well... maybe this could be a service that implements twilio to send the SMS, but I don't have an account D:
           soo for that this is going to be a fake service that never works :c, don't kill me please D: */
        throw Error("Error sending message");
    }
}

export class ConsoleSender implements MessageSenderInterface {
    canHandle(data: DataForSendMessage): boolean {
        return _.has(data, "message");
    }

    sendNotification(data: DataForSendMessage): void {
        console.log(data.message);
    }
}

export class MessageSender {
    senders: MessageSenderInterface[] = [];

    registerSender(sender: MessageSenderInterface) {
        this.senders.push(sender);
    }

    sendNotification(data: DataForSendMessage) {
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

const messageSender = new MessageSender();

messageSender.registerSender(new SMSSender());
messageSender.registerSender(new ConsoleSender());

export default messageSender;