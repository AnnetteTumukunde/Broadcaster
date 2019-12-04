import joi from 'joi';

const validSignup = {
    validation(schema) {
        const signup = {
            id: joi.number(),
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

const validSignin = {
    validation(schema) {
        const signin = {
            email: joi.string().trim().required().min(10),
            password: joi.string().required().min(8).alphanum(),
        };
        return joi.validate(schema, signin);
    },
};

const validRecord = {
    validation(schema) {
        const incident = {
            title: joi.string().trim().required().min(5),
            comment: joi.string().required().trim(),
            status: joi.string().required().trim(),
            location: joi.string().required().trim(),
            type: joi.string().required().trim(),
            image: joi.binary(),
            video: joi.binary(),
        };
        return joi.validate(schema, incident);
    },
};

const validLocation = {
    validation(schema) {
        const record = {
            location: joi.string().required().trim(),
        };
        return joi.validate(schema, record);
    },
};

const validComment = {
    validation(schema) {
        const record = {
            comment: joi.string().required().trim(),
        };
        return joi.validate(schema, record);
    },
};

export { validSignup, validSignin, validRecord, validLocation, validComment };
