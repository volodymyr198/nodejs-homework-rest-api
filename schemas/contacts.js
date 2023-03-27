const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    phone: Joi.string()
        .regex(/^[0-9 ()-]+$/)
        .required(),
});

module.exports = contactSchema;
