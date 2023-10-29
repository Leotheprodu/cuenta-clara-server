const { clientsModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');

const checkClientOfUser = async (req, res, next) => {
    const { id } = matchedData(req);
    const consultaBD = await clientsModel.scope('with_parent_user_id').findOne({
        where: { id },
    });

    if (consultaBD.parent_user_id === req.session.user.id) {
        next();
    } else {
        handleHttpError(
            res,
            'No tienes permiso, el cliente no le pertenece',
            401,
        );
    }
};

module.exports = checkClientOfUser;
