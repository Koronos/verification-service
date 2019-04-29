import * as express from "express";
import * as verificationCodeController from "../controllers/verificationCodeController";
import fakeAuthMiddleware from "../middlewares/fakeAuthMiddleware";

const verificationCodeRouting = express.Router();

verificationCodeRouting.use(fakeAuthMiddleware);
verificationCodeRouting.post("/", verificationCodeController.create);
verificationCodeRouting.post("/resend", verificationCodeController.resend);
verificationCodeRouting.post("/verify", verificationCodeController.verify);

export default verificationCodeRouting;