const { matchedData } = require('express-validator');
const { users_businessModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { typeOfRoles } = require('../config/constants');

const checkBusinessOfUser = async (req, res, next) => {
  const { id } = matchedData(req);
  const user_id = req.session.user.id;
  const roles = req.session.roles;

  const consultaBD = await users_businessModel.findOne({
    where: { id },
  });
  if (roles.includes(typeOfRoles.admin.id)) {
    next();
  } else if (consultaBD.user_id === user_id) {
    next();
  } else {
    handleHttpError(res, 'No tienes permisos para realizar esta acción.', 401);
  }
};

module.exports = checkBusinessOfUser;
