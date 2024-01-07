const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorGetBalanceByClient = [
  check('id').exists().isNumeric().notEmpty(),

  (req, res, next) => validateResults(req, res, next),
];
const validatorRechargeBalance = [
  check('client_id').exists().isNumeric().notEmpty(),
  check('amount').exists().isNumeric().notEmpty(),
  check('balance_amount').exists().isNumeric().notEmpty(),
  check('balance_id').exists().isNumeric().notEmpty(),
  check('user_payment_methods_id').exists().isNumeric().notEmpty(),
  check('balances_types_id').exists().isNumeric().notEmpty(),

  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  validatorGetBalanceByClient,
  validatorRechargeBalance,
};
