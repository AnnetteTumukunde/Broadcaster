import joi from 'joi';

const userSignupValidation = {
    validation(schema) {
        const signup = {
            firstname: joi.string().trim().required(),
            lastname: joi.string().trim().required(),
            email: joi.string().trim().required(),
            phoneNumber: joi.string().max(12).min(10).required(),
            password: joi.string().min(8).alphanum().required(),
            type: joi.string().trim().required(),
        };
        return joi.validate(schema, signup);
    },
};

const userSigninValidation = {
    validation(schema) {
        const signin = {
            email: joi.string().trim().required().min(10),
            password: joi.string().required().min(8).alphanum(),
        };
        return joi.validate(schema, signin);
    },
};

export { userSignupValidation, userSigninValidation };
