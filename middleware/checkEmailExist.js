import { matchedData } from 'express-validator';
import models from '../models/index.js';
const { usersModel } = models;
import { handleHttpError } from '../utils/handleError.js';

const checkEmailExist = async (req, res, next) => {
  const body = matchedData(req);
  const { email } = body;
  const consultaBD = await usersModel.findOne({
    where: { email },
  });

  if (consultaBD === null) {
    next();
  } else {
    handleHttpError(res, 'El Correo ya está registrado', 403);
  }
};

export default checkEmailExist;
