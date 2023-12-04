const { handleHttpError } = require('../utils/handleError');
const { resUsersSessionData } = require('../utils/handleOkResponses');

const isLoggedInTrue = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn === true) {
    next();
  } else {
    handleHttpError(res, 'El usuario no ha iniciado sesion');
  }
};

const isLoggedInFalse = async (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (isLoggedIn === false || isLoggedIn === undefined) {
    next();
  } else {
    resUsersSessionData(req, res, 'El Usuario ha iniciado sesion');
  }
};

module.exports = { isLoggedInTrue, isLoggedInFalse };
