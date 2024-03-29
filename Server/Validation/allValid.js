import joi from 'joi';

const validSignup = {
    validation(schema) {
        const signup = {
            firstname: joi.string().trim().required(),
            lastname: joi.string().trim().required(),
            email: joi.string().email().trim().required(),
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
            email: joi.string().required(),
            password: joi.string().required(),
        };
        return joi.validate(schema, signin);
    },
};

const validRecord = {
    validation(schema) {
        const incident = {
            title: joi.string().trim().required().min(5),
            comment: joi.string().required().trim(),
            status: joi.string().trim(),
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

const validId = {
    validation(schema) {
        const record = {
            id: joi.number().required().max(100000).min(1),
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

const validStatus = {
    validation(schema) {
        const record = {
            status: joi.string().required(),
        };
        return joi.validate(schema, record);
    },
};

export { validSignup, validSignin, validRecord, validLocation, validComment, validStatus, validId };
