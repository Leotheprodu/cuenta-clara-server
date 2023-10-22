//balanceByClientCtrl

const { matchedData } = require('express-validator');
const { balancesModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const balanceByClientCtrl = async (req, res) => {
    const { id } = matchedData(req);

    try {
        const balance = await balancesModel.findAll({
            where: { client_id: id },
        });
        resOkData(res, balance);
    } catch (error) {
        console.error(error);
        handleHttpError(
            res,
            'Error al intentar mostrar el balance del cliente',
        );
    }
};
module.exports = {
    balanceByClientCtrl,
};
