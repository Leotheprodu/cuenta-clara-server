const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorCreateClients = [
    check('username')
        .exists()
        .notEmpty()
        .isString()
        .withMessage('El nombre de usuario debe ser una cadena de texto.'),
    check('email')
        .optional({ nullable: true, checkFalsy: true })
        .isEmail()
        .notEmpty()
        .withMessage(
            'El email debe ser una dirección de correo electrónico válida.',
        ),
    check('cellphone')
        .optional()
        .isInt()
        .withMessage('El número de teléfono debe ser un número entero.'),
    check('token')
        .exists()
        .notEmpty()
        .isString()
        .withMessage('El token debe ser una cadena de texto.'),
    check('id_business')
        .exists()
        .isArray()
        .withMessage('id_business debe ser un array.')
        .custom((values) => values.every(Number.isInteger))
        .withMessage(
            'Todos los elementos en id_business deben ser números enteros.',
        ),
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
