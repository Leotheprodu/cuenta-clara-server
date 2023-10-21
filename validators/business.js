const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorGetBussiness = [
    check('id').exists().isInt().notEmpty(),

    (req, res, next) => validateResults(req, res, next),
];

module.exports = {
    validatorGetBussiness,
};
