import { handleHttpError } from '../utils/handleError.js';
import models from '../models/index.js';
const { clientsModel } = models;

const checkPin = async (req, res, next) => {
  const { token } = req.params;
  const { pin } = req.body;
  const clientData = await clientsModel.scope('withPin').findOne({
    where: { token },
    attributes: ['pin'],
  });
  if (!clientData.pin && !pin) {
    handleHttpError(res, 'No PIN');
    return;
  } else if (clientData.pin && !pin) {
    handleHttpError(res, 'Si PIN');
  } else {
    next();
  }
};

export { checkPin };
