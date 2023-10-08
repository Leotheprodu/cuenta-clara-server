const { clientsModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

const checkClientOfUser = async (req, res, next) => {
    const id = req.params.id;
    const consultaBD = await clientsModel.scope('with_parent_user_id').findOne({
        where: { id },
    });

    if (consultaBD.parent_user_id === req.session.user.id) {
        next();
    } else {
        handleHttpError(res, 'No tienes permiso de eliminar ese usuario', 401);
    }
};

module.exports = checkClientOfUser;
