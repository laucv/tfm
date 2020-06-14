const joi = require('@hapi/joi');

const registerValidacion = (data) => {
    const schema = joi.object({
        username: joi.string().min(5).required(),
        email: joi.string().min(5).required().email(),
        password: joi.string().min(5).required()
    });
    return schema.validate(data);
};

const loginValidacion = (data) => {
    const schema = joi.object({
        email: joi.string().min(5).required().email(),
        password: joi.string().min(5).required()
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidacion;
module.exports.loginValidacion = loginValidacion;
