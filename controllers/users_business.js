const { users_businessModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const businessByUserCtrl = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const business = await users_businessModel.findAll({
            where: { user_id },
        });
        if (!business) {
            handleHttpError(res, 'El negocio no existe', 404);
            return;
        }
        resOkData(res, business);
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al buscar los negocios del usuario');
    }
};
module.exports = {
    businessByUserCtrl,
};
