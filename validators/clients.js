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
    check('id_business').exists().notEmpty().isInt(),
    (req, res, next) => validateResults(req, res, next),
];
const validatorUpdateClients = [
    check('id').exists().notEmpty(),
    check('username').exists().notEmpty().isString(),
    check('email')
        .optional({ nullable: true, checkFalsy: true })
        .isEmail()
        .notEmpty(),
    check('cellphone').optional().isInt(),
    check('token').exists().notEmpty().isString(),
    (req, res, next) => validateResults(req, res, next),
];
const validatorDeleteClient = [
    check('id').exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next),
];
const validatorQueryClients = [
    check('activo').optional().isBoolean(),
    (req, res, next) => validateResults(req, res, next),
];
const validatorGetClient = [
    check('id').exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next),
];

module.exports = {
    validatorCreateClients,
    validatorDeleteClient,
    validatorQueryClients,
    validatorUpdateClients,
    validatorGetClient,
};
