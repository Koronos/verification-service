import request from "supertest";
import app from "../src/app";
import { VerificationCode } from "../src/entities/VerificationCode";
import async from "async";

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get("/")
            .expect(200);
    });
});

describe("Create Verification code", () => {
    it("Empty should return 401", () => {
        return request(app)
            .post("/verification-code")
            .expect(401);
    });
    it("With auth should return 400", () => {
        return request(app)
            .post("/verification-code")
            .set("x-auth", "some")
            .expect(400);
    });
    it("Without phone should return 400", () => {
        return request(app)
            .post("/verification-code")
            .set("x-auth", "some")
            .expect(400);
    });
    it("With invalid phone should return 400", (done) => {
        async.series([
            (cb) => request(app).post("/verification-code").send({phoneNumber: "badphone v:"}).set("x-auth", "some").expect(400, cb),
            (cb) => request(app).post("/verification-code").send({phoneNumber: "¿'sdasd sad "}).set("x-auth", "some").expect(400, cb),
            (cb) => request(app).post("/verification-code").send({phoneNumber: "0000000000"}).set("x-auth", "some").expect(400, cb),
            (cb) => request(app).post("/verification-code").send({phoneNumber: "1234567890"}).set("x-auth", "some").expect(400, cb),
            (cb) => request(app).post("/verification-code").send({phoneNumber: "+521234567890"}).set("x-auth", "some").expect(400, cb),
        ], done);
    });
    it("With valid phone should return 201 and a code", (done) => {
        async.series([
            (cb) => request(app).post("/verification-code").send({phoneNumber: "3314290318"}).set("x-auth", "some").expect(201, cb),
            (cb) => request(app).post("/verification-code").send({phoneNumber: "33-1429-0318"}).set("x-auth", "some").expect(201, cb),
            (cb) => request(app).post("/verification-code").send({phoneNumber: "33 1429 0318"}).set("x-auth", "some").expect(201, cb),
            (cb) => request(app).post("/verification-code").send({phoneNumber: "+523314290318"}).set("x-auth", "some").expect(201, cb),
            (cb) => request(app).post("/verification-code").send({phoneNumber: "+52-33-1429-0318"}).set("x-auth", "some").expect(201, cb),
            (cb) => request(app).post("/verification-code").send({phoneNumber: "+52 33 1429 0318"}).set("x-auth", "some").expect(201, cb),
        ], done);
    });
});

describe("Resend Verification code", () => {
    it("should return 401 if is empty", () => {
        return request(app)
            .post("/verification-code")
            .expect(401);
    });

    const appRequest = request(app);

    it("Without create already one, return 404", async () => {
        // Recreate database
        await VerificationCode.sync({force: true});

        return appRequest
            .post("/verification-code/resend")
            .set("x-auth", "some")
            .expect(404);
    });

    it("If already created should return 200", async () => {
        // Recreate database
        await VerificationCode.sync({force: true});

        // Create a code
        await appRequest
            .post("/verification-code")
            .set("x-auth", "some")
            .send({
                phoneNumber: "3314290318"
            })
            .expect(201);

        return appRequest
            .post("/verification-code/resend")
            .set("x-auth", "some")
            .expect(200);
    });
});

describe("Verify VerificationCode", () => {
    it("Empty should return 401", () => {
        return request(app)
            .post("/verification-code/verify")
            .expect(401);
    });

    it("With auth should return 400", () => {
        return request(app)
            .post("/verification-code/verify")
            .set("x-auth", "some")
            .expect(400);
    });

    it("With invalid validationCode should return 400 test 1", () => {
        return request(app)
            .post("/verification-code/verify")
            .send({
                verificationCode: "asdassdad"
            })
            .set("x-auth", "some")
            .expect(400);
    });
    it("With invalid validationCode should return 400 test 2", () => {
        return request(app)
            .post("/verification-code/verify")
            .send({
                verificationCode: "874"
            })
            .set("x-auth", "some")
            .expect(400);
    });
    it("With invalid validationCode should return 400 test 3", () => {
        return request(app)
            .post("/verification-code/verify")
            .send({
                verificationCode: 784
            })
            .set("x-auth", "some")
            .expect(400);
    });
    it("With valid validationCode but doesn't exist should return 404", () => {
        return request(app)
            .post("/verification-code/verify")
            .send({
                verificationCode: "8748"
            })
            .set("x-auth", "some")
            .expect(404);
    });
    it("With valid and existent validationCode but distinct userId should return 404", async () => {
        // Recreate database
        await VerificationCode.sync({force: true});

        const verificationCode = await VerificationCode.create({
            phoneNumber: "3314298888",
            userId: "test",
            code: "1234"
        });

        return request(app)
            .post("/verification-code/verify")
            .send({
                verificationCode: verificationCode.code
            })
            .set("x-auth", "some")
            .expect(404);
    });
    it("With valid and existent validationCode but distinct userId should return 404", async () => {
        // Recreate database
        await VerificationCode.sync({force: true});

        const verificationCode = await VerificationCode.create({
            phoneNumber: "3314298888",
            userId: "test",
            code: "1234"
        });

        return request(app)
            .post("/verification-code/verify")
            .send({
                verificationCode: verificationCode.code
            })
            .set("x-auth", "some")
            .expect(404);
    });
});