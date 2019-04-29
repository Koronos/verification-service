import * as express from "express";
import * as verificationCodeController from "../controllers/verificationCodeController";
import fakeAuthMiddleware from "../middlewares/fakeAuthMiddleware";
import { verificationCodeForCreationRules, verificationCodeForVerifyRules } from "../models/validationRules";

const verificationCodeRouting = express.Router();

verificationCodeRouting.use(fakeAuthMiddleware);
verificationCodeRouting.post("/", verificationCodeForCreationRules, verificationCodeController.create);
verificationCodeRouting.post("/resend", verificationCodeController.resend);
verificationCodeRouting.post("/verify", verificationCodeForVerifyRules, verificationCodeController.verify);

export default verificationCodeRouting;