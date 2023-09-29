const { matchedData } = require('express-validator');
const { usersModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { compare } = require('../utils/handlePassword');
const { resUsersSessionData } = require('../utils/handleOkResponses');

const loginCtrl = async (req, res) => {
    try {
        //Import the data provided by the client already filtered
        const data = matchedData(req);

        const { email, password } = data;

        //extract user data from database
        const userData = await usersModel.scope('withPassword').findOne({
            where: { email },
        });
        if (!userData) {
            handleHttpError(res, 'user does not exist', 404);
            return;
        }
        if (userData.activo === 0) {
            handleHttpError(res, 'user is not active', 401);
            return;
        }
        const hashPassword = await userData.password;

        const check = await compare(password, hashPassword);
        if (!check) {
            handleHttpError(res, 'Invalid Password', 401);
            return;
        }
        if (process.env.NODE_ENV === 'production') {
            res.cookie('sessionId', req.session.id, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000 * 24,
                sameSite: 'none',
            });
        } else {
            res.cookie('sessionId', req.session.id, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000 * 24,
            });
        }
        req.session.user = userData;
        req.session.isLoggedIn = true;
        resUsersSessionData(req, res, 'successful Login');
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'error authenticating user');
    }
};

module.exports = {
    loginCtrl,
};
