const { matchedData } = require('express-validator');
const { usersModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

const checkEmailExist = async (req, res, next) => {
    const body = matchedData(req);
    const { email } = body;
    const consultaBD = await usersModel.findOne({
        where: { email },
    });

    if (consultaBD === null) {
        next();
    } else {
        handleHttpError(res, 'El Correo ya esta registrado', 403);
    }
};

module.exports = checkEmailExist;
