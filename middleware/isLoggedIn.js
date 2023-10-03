const { handleHttpError } = require('../utils/handleError');
const { resUsersSessionData } = require('../utils/handleOkResponses');
const { RefreshSessionData } = require('../utils/handleRefreshSessionData');

const isLoggedInTrue = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn === true) {
        next();
    } else {
        handleHttpError(res, 'User must be authenticated');
    }
};

const isLoggedInFalse = async (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn === false || isLoggedIn === undefined) {
        next();
    } else {
        await RefreshSessionData(req);
        resUsersSessionData(req, res, 'User already authenticated');
    }
};

module.exports = { isLoggedInTrue, isLoggedInFalse };
