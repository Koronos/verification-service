import * as express from "express";
import { VerificationCode } from "../entities/VerificationCode";
import verificationCodeGeneratorService from "../services/verificationCodeGeneratorService";
import messageSenderService from "../services/messageSenderService";
import { validationResult } from "express-validator/check";

/**
 * Register a user by phone number
 *
 * @param req
 * @param res
 */
export let create = async (req: express.Request, res: express.Response) => {
    // Validate request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    // Delete old verification codes
    await VerificationCode.destroy({
        where: {
            userId: res.app.locals.user.id
        }
    });

    // Create verificationCode
    await VerificationCode.create({
        userId: res.app.locals.user.id,
        code: await verificationCodeGeneratorService.generateUniqueCode(),
        phoneNumber: req.body.phoneNumber
    });

    res.status(201).send("");
};

/**
 * Notify code vía messageSender service
 *
 * @param req
 * @param res
 */
export let notify = async (req: express.Request, res: express.Response) => {
    const verificationCode = await VerificationCode.findOne({
        where: {
            userId: res.app.locals.user.id
        }
    });

    if (!verificationCode) {
        return res.status(404).send("Verification code is not set");
    }

    messageSenderService.sendNotification({
        message: `Hi! Your verification code for Rever is ${verificationCode.code}`,
        phoneNumber: verificationCode
    });

    res.send("");
};


/**
 * Login a user with verification code
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
export let verify = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const verificationCode = await VerificationCode.findOne({
        where: {
            code: `${req.body.verificationCode}`,
            userId: req.app.locals.user.id
        }
    });

    verificationCode ? res.status(200).send("") : res.status(404).send("Verification code not found");
};