import { ConsoleSender, SMSSender, VerificationCodeSender } from "../src/services/VerificationCodeSender";

describe("SMSsender", () => {
    it("Sender could't be used without phoneNumber", () => {
        const sender = new SMSSender();
        expect(sender.canHandle({code: "asdas"})).toBeFalsy();
    });
    it("Sender could be used with phoneNumber", () => {
        const sender = new SMSSender();
        expect(sender.canHandle({code: "asdas", phoneNumber: "2312312312"})).toBeTruthy();
    });
    it("Sender should throw an error because is not implemented XD", () => {
        const sender = new SMSSender();

        const data = {code: "asdas", phoneNumber: "2312312312"};

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
        expect(sender.canHandle({code: "asdas"})).toBeTruthy();
    });
    it("Sender should works", () => {
        const sender = new ConsoleSender();

        const data = {code: "asdas", phoneNumber: "2312312312"};

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
        const sender = new VerificationCodeSender();

        const data = {code: "asdas", phoneNumber: "2312312312"};

        expect(() => sender.sendNotification(data)).toThrow();
    });
    it("Sender should throw an error with SMSsender", () => {
        const sender = new VerificationCodeSender();

        sender.registerSender(new SMSSender());

        const data = {code: "asdas", phoneNumber: "2312312312"};

        expect(() => sender.sendNotification(data)).toThrow();

        const dataWithoutPhoneNumber = {code: "asdas"};

        expect(() => sender.sendNotification(dataWithoutPhoneNumber)).toThrow();
    });
    it("Sender should work with ConsoleSender", () => {
        const sender = new VerificationCodeSender();

        sender.registerSender(new ConsoleSender());

        const data = {code: "asdas"};

        expect(() => sender.sendNotification(data)).not.toThrow();
    });
});