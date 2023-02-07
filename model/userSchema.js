const joi = require('joi');

module.exports = joi.object({
    nome: joi.string()
        .min(3)
        .max(10)
        .required(),

    age: joi.number()
        .integer()
        .min(1)
        .required(),

    uf: joi.string()
        .length(2),

    senha: joi.string()
        .min(3)
        .pattern(/^(?=.*[0-9]+.*)\w+$/i),

    email: joi.string()
        .email()
        .required()
})