const { usersModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

const checkEmailExist = async (req, res, next) => {
    const email = req.body.email;
    const consultaBD = await usersModel.findOne({
        where: { email },
    });

    if (consultaBD === null) {
        next();
    } else {
        handleHttpError(res, 'THE EMAIL IS ALREADY REGISTERED');
    }
};

module.exports = checkEmailExist;
