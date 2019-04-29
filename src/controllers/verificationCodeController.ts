import * as express from "express";
import { VerificationCode } from "../entities/VerificationCode";
import verificationCodeGeneratorService from "../services/verificationCodeGeneratorService";
import verificationCodeSender from "../services/VerificationCodeSender";

/**
 * Register a user by phone number
 *
 * @param req
 * @param res
 */
export let create = async (req: express.Request, res: express.Response) => {
    // Validate request
    req.assert("phoneNumber", "phoneNumber is required").not().isEmpty();
    req.assert("phoneNumber", "phoneNumber is not valid").isMobilePhone("en-US");
    const phoneNumber = req.sanitize("phoneNumber").ltrim(" -");

    const errors = req.validationErrors();

    if (errors) {
        res.status(400).json(errors);
    }

    VerificationCode.findAll({
        where: {
            userId: res.app.locals.user.id,
        }
    });

    // Create verificationCode
    const verificationCode = new VerificationCode();

    verificationCode.userId = res.app.locals.user.id;
    verificationCode.code = await verificationCodeGeneratorService.generateUniqueCode();

    const created = await VerificationCode.create(verificationCode);

    verificationCodeSender.sendNotification({
        code: created.code,
        phoneNumber: phoneNumber
    });

    res.send({
        verificationCode: created.code
    });
};

/**
 * Resend code
 *
 * @param req
 * @param res
 */
export let resend = (req: express.Request, res: express.Response) => {
    res.send("resend");
};


/**
 * Login a user with verification code
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
export let verify = (req: express.Request, res: express.Response) => {
    req.assert("verificationCode", "verificationCode is required").not().isEmpty();

    const errors = req.validationErrors();

    if (errors) {
        res.status(400).json(errors);
    }

    const verificationCode = VerificationCode.findOne({
        where: {
            code: req.body.verificationCode
        }
    });

    verificationCode ? res.status(200).send("") : res.status(404).send("Verification code not found");
};