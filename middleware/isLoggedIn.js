const { handleHttpError } = require('../utils/handleError');
const { resUsersSessionData } = require('../utils/handleOkResponses');
const { RefreshSessionData } = require('../utils/handleRefreshSessionData');

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
        await RefreshSessionData(req);
        resUsersSessionData(req, res, 'El Usuario ha iniciado sesion');
    }
};

module.exports = { isLoggedInTrue, isLoggedInFalse };
