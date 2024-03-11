import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';
import { type Request, type Response, type NextFunction } from 'express';

const validatorGetBalanceByClient = [
  check('id').exists().isNumeric().notEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorRechargeBalance = [
  check('client_id').exists().isNumeric().notEmpty(),
  check('amount').exists().isNumeric().notEmpty(),
  check('balance_amount').exists().isNumeric().notEmpty(),
  check('balance_id').exists().isNumeric().notEmpty(),
  check('user_payment_methods_id').exists().isNumeric().notEmpty(),
  check('balances_types_id').exists().isNumeric().notEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
export { validatorGetBalanceByClient, validatorRechargeBalance };
