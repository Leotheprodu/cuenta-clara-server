import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';
import { type Request, type Response, type NextFunction } from 'express';

const validatorGetBussiness = [
  check('active').exists().isBoolean().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorCreateBusiness = [
  check('name').exists().isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorGetFavoriteBussiness = [
  check('id').exists().isInt().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorUpdateBussiness = [
  check('id').exists().isInt().notEmpty(),
  check('name').exists().isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];

export {
  validatorGetBussiness,
  validatorGetFavoriteBussiness,
  validatorCreateBusiness,
  validatorUpdateBussiness,
};
