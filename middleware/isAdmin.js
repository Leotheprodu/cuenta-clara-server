const { typeOfRoles } = require('../config/constants');
const { handleHttpError } = require('../utils/handleError');

const isAdmin = (req, res, next) => {
  const roles = req.session.roles;

  if (roles.includes(typeOfRoles.admin.id)) {
    next();
  } else {
    handleHttpError(res, 'No tienes permisos para realizar esta acción');
  }
};

module.exports = { isAdmin };
