const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateClients = [
    check('username').exists().notEmpty().isString(),
    check('email')
        .optional({ nullable: true, checkFalsy: true })
        .isEmail()
        .notEmpty(),
    check('cellphone').optional().isInt(),
    check('token').exists().notEmpty().isString(),
    check('related_parent_user').exists().notEmpty().isInt(),
    check('related_user')
        .optional({ nullable: true, checkFalsy: true })
        .isInt(),
    (req, res, next) => validateResults(req, res, next),
];
const validatorDeleteClient = [
    check('id').exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next),
];
const validatorQueryClients = [
    check('activo').optional().isBoolean(),
    check('id').optional().isInt(),
    (req, res, next) => validateResults(req, res, next),
];

module.exports = {
    validatorCreateClients,
    validatorDeleteClient,
    validatorQueryClients,
};
