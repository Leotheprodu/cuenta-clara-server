import { validationResult } from 'express-validator';
import { type Request, type Response, type NextFunction } from 'express';

const validateResults = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    validationResult(req).throw();
    next();
  } catch (err) {
    console.error(err);
    res.status(422);
    res.send({
      error: err.array(),
      message: 'Revisa que los datos sean correctos',
    });
  }
};
export default validateResults;
