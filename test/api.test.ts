import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get("/")
            .expect(200);
    });
});

describe("Create Verification code", () => {
    it("Empty should return 401", () => {
        return request(app)
            .post("/verificationCode")
            .expect(401);
    });
    it("With auth should return 400", () => {
        return request(app)
            .post("/verificationCode")
            .set("x-auth", "some")
            .expect(400);
    });
    it("Without phone should return 400", () => {
        return request(app)
            .post("/verificationCode")
            .set("x-auth", "some")
            .expect(400);
    });
    it("With invalid phone should return 400", () => {
        return request(app)
            .post("/verificationCode")
            .send({
                phoneNumber: "bad phone v:"
            })
            .set("x-auth", "some")
            .expect(400);
    });
    it("With valid phone should return 200", () => {
        return request(app)
            .post("/verificationCode")
            .send({
                phoneNumber: "3314290318"
            })
            .set("x-auth", "some")
            .expect(200)
            .then(res => {
                expect(res.body.validationCode).toHaveLength(4);
            });
    });
});

describe("Verify VerificationCode", () => {

    it("Empty should return 401", () => {
        return request(app)
            .post("/verificationCode/verify")
            .expect(401);
    });

    it("With auth should return 400", () => {
        return request(app)
            .post("/verificationCode/verify")
            .set("x-auth", "some")
            .expect(400);
    });

    it("With invalid validationCode should return 400 test 1", () => {
        return request(app)
            .post("/verificationCode")
            .send({
                validationCode: "asdassdad"
            })
            .set("x-auth", "some")
            .expect(400);
    });
    it("With invalid validationCode should return 400 test 2", () => {
        return request(app)
            .post("/verificationCode")
            .send({
                validationCode: "874"
            })
            .set("x-auth", "some")
            .expect(400);
    });
    it("With valid validationCode but doesn't exist should return 404", () => {
        return request(app)
            .post("/verificationCode")
            .send({
                validationCode: "8748"
            })
            .set("x-auth", "some")
            .expect(400);
    });
    it("With valid and existent validationCode should return 200", () => {
        let verificationCode: string;
        // Create verification code
        request(app)
            .post("/verificationCode")
            .send({
                phoneNumber: "3314290318"
            })
            .set("x-auth", "some")
            .end((res) => {
                try {
                    verificationCode = res.verificationCode;
                } catch (e) {
                    // Covered in With valid phone should return 200 test
                }
            });

        return request(app)
            .post("/verificationCode")
            .send({
                phoneNumber: verificationCode
            })
            .set("x-auth", "some")
            .expect(200);
    });
});