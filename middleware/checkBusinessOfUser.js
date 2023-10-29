const { matchedData } = require('express-validator');
const { users_businessModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

const checkBusinessOfUser = async (req, res, next) => {
    const { id } = matchedData(req);
    const user_id = req.session.user.id;

    const consultaBD = await users_businessModel.findOne({
        where: { id },
    });

    if (consultaBD.user_id === user_id) {
        next();
    } else {
        handleHttpError(
            res,
            'No tienes permiso, este negocio no le pertenece',
            401,
        );
    }
};

module.exports = checkBusinessOfUser;
