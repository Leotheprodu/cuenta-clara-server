const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorGetProductsAndServicesByClient = [
    check('business_id').exists().isNumeric().notEmpty(),

    (req, res, next) => validateResults(req, res, next),
];

module.exports = {
    validatorGetProductsAndServicesByClient,
};
