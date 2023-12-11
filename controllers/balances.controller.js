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
const ClientBalancesCtrl = async (req, res) => {
    try {
        const defaultUserBusiness = req.session.userBusiness;
        const balances = await balancesModel.findAll({
            where: { business_id: defaultUserBusiness },
        });

        resOkData(res, balances);
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al intentar mostrar los balances');
    }
};
module.exports = {
    balanceByClientCtrl,
    ClientBalancesCtrl,
};
