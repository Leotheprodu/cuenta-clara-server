const { handleHttpError } = require('../utils/handleError');

const isLoggedInTrue = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn === true) {
        next();
    } else {
        handleHttpError(res, 'User must be authenticated');
    }
};

const isLoggedInFalse = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;

    if (isLoggedIn === false || isLoggedIn === undefined) {
        next();
    } else {
        handleHttpError(res, 'The user should not be logged in');
    }
};

module.exports = { isLoggedInTrue, isLoggedInFalse };
