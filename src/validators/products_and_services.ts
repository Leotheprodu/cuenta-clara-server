import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';
import { type Request, type Response, type NextFunction } from 'express';

const validatorGetProductsAndServicesByClient = [
  check('business_id').exists().isNumeric().notEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorProductsAndServicesUpdateDefault = [
  check('id').exists().isNumeric().notEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorGetProductsAndServicesUpdateByClient = [
  check('id').exists().isNumeric(),
  check('user_id').exists().isNumeric(),
  check('name').exists().isString().notEmpty(),
  check('description').exists().isString().notEmpty(),
  check('unit').exists().isString().notEmpty(),
  check('unit_price').exists().isString().notEmpty(),
  check('code').exists().isString().notEmpty(),
  check('type').exists().isString().notEmpty(),
  check('inventory_control').exists().isBoolean(),
  check('default').exists().isBoolean(),
  check('business_id').exists().isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];

export {
  validatorGetProductsAndServicesByClient,
  validatorGetProductsAndServicesUpdateByClient,
  validatorProductsAndServicesUpdateDefault,
};
