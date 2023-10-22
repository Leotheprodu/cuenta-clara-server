const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorGetBalanceByClient = [
    check('id').exists().isNumeric().notEmpty(),

    (req, res, next) => validateResults(req, res, next),
];

module.exports = {
    validatorGetBalanceByClient,
};
