const { clientsModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');

const checkClientOfUser = async (req, res, next) => {
  try {
    const { id } = matchedData(req);
    const consultaBD = await clientsModel.findOne({
      where: { id },
    });

    if (consultaBD.parent_user_id === req.session.user.id) {
      next();
    } else {
      handleHttpError(
        res,
        'No tienes permiso, el cliente no le pertenece',
        401,
      );
    }
  } catch (error) {
    console.error(error);
    handleHttpError(
      res,
      'Error al verificar si el cliente pertenece al usuario',
    );
  }
};

module.exports = checkClientOfUser;
