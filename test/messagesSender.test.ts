import { ConsoleSender, MessageSender, SMSSender } from "../src/services/messageSenderService";

describe("SMSsender", () => {
    it("Sender could't be used without phoneNumber", () => {
        const sender = new SMSSender();
        expect(sender.canHandle({message: "asdas"})).toBeFalsy();
    });
    it("Sender could be used with phoneNumber", () => {
        const sender = new SMSSender();
        expect(sender.canHandle({message: "asdas", phoneNumber: "2312312312"})).toBeTruthy();
    });
    it("Sender should throw an error because is not implemented XD", () => {
        const sender = new SMSSender();

        const data = {message: "asdas", phoneNumber: "2312312312"};

        let throwsAnError = false;

        try {
            sender.sendNotification(data);
        } catch (e) {
            throwsAnError = true;
        }

        expect(throwsAnError).toBeTruthy();
    });
});

describe("ConsoleSender", () => {
    it("Sender could be used without phoneNumber", () => {
        const sender = new ConsoleSender();
        expect(sender.canHandle({message: "asdas"})).toBeTruthy();
    });
    it("Sender should works", () => {
        const sender = new ConsoleSender();

        const data = {message: "asdas", phoneNumber: "2312312312"};

        let throwsAnError = false;

        try {
            sender.sendNotification(data);
        } catch (e) {
            throwsAnError = true;
        }

        expect(throwsAnError).toBeFalsy();
    });
});

describe("Sender service", () => {
    it("Sender should throw an error without senders", () => {
        const sender = new MessageSender();

        const data = {message: "asdas", phoneNumber: "2312312312"};

        expect(() => sender.sendNotification(data)).toThrow();
    });
    it("Sender should throw an error with SMSsender", () => {
        const sender = new MessageSender();

        sender.registerSender(new SMSSender());

        const data = {message: "asdas", phoneNumber: "2312312312"};

        expect(() => sender.sendNotification(data)).toThrow();

        const dataWithoutPhoneNumber = {message: "asdas"};

        expect(() => sender.sendNotification(dataWithoutPhoneNumber)).toThrow();
    });
    it("Sender should work with ConsoleSender", () => {
        const sender = new MessageSender();

        sender.registerSender(new ConsoleSender());

        const data = {message: "asdas"};

        expect(() => sender.sendNotification(data)).not.toThrow();
    });
});