import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';
import { type Request, type Response, type NextFunction } from 'express';
const validatorSignUp = [
  check('username').exists().notEmpty().isLength({ min: 3, max: 20 }),

  check('email').exists().notEmpty().isEmail(),

  check('password').exists().notEmpty().isString(),

  check('cellphone').exists().notEmpty().isInt(),

  check('country').exists().notEmpty().isString(),

  check('address').exists().notEmpty().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorLogin = [
  check('email').exists().notEmpty().isEmail(),

  check('password').exists().notEmpty().isString(),

  check('isEmployee').optional().isBoolean(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorLoginEmployee = [
  check('username').exists().notEmpty().isString(),

  check('password').exists().notEmpty().isString(),

  check('isEmployee').optional().isBoolean(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorEmail = [
  check('email').exists().notEmpty().isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorRecoverPassword = [
  check('email').exists().notEmpty().isEmail(),

  check('password').exists().notEmpty().isString(),

  check('pin').exists().notEmpty().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];

const validatorGetItem = [
  check('id').exists().isNumeric().notEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorGetToken = [
  check('token').exists().isString().notEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
const validatorGetEmail = [
  check('email').exists().isEmail().notEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];

const validatorUpdateUsers = [
  check('username').optional().isLength({ min: 3, max: 20 }),

  check('email').optional().isEmail(),

  check('password').optional().isString(),

  (req: Request, res: Response, next: NextFunction) => {
    validateResults(req, res, next);
  },
];
export {
  validatorLogin,
  validatorGetItem,
  validatorSignUp,
  validatorEmail,
  validatorRecoverPassword,
  validatorUpdateUsers,
  validatorGetEmail,
  validatorGetToken,
  validatorLoginEmployee,
};
