import { body } from "express-validator/check";
import { PhoneNumberUtil } from "google-libphonenumber";

export let verificationCodeForCreationRules = [
    body("phoneNumber", "phoneNumber is required").not().isEmpty(),
    body("phoneNumber", "phoneNumber is not valid").custom(value => {
        const phoneUtil = PhoneNumberUtil.getInstance();
        const number = phoneUtil.parse(value, "us");
        return phoneUtil.isValidNumber(number);
    })
];

export let verificationCodeForVerifyRules = [
    body("verificationCode", "verificationCode is required").not().isEmpty(),
    body("verificationCode", "verificationCode is not valid").isLength({max: 4, min: 4}).isNumeric(),
];