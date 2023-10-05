const { clientsModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

const checkClientOfUser = async (req, res, next) => {
    const id = req.params.id;
    const consultaBD = await clientsModel
        .scope('with_related_parent_user')
        .findOne({
            where: { id },
        });

    if (consultaBD.related_parent_user === req.session.user.id) {
        next();
    } else {
        handleHttpError(res, 'No tienes permiso de eliminar ese usuario', 401);
    }
};

module.exports = checkClientOfUser;
