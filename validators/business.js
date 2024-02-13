const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorGetBussiness = [
  check('active').exists().isBoolean().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];
const validatorCreateBusiness = [
  check('name').exists().isString().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];
const validatorGetFavoriteBussiness = [
  check('id').exists().isInt().notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  validatorGetBussiness,
  validatorGetFavoriteBussiness,
  validatorCreateBusiness,
};
