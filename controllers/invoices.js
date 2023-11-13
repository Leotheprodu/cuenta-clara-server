const { matchedData } = require('express-validator');
/* const { clientsModel, balancesModel } = require('../models'); */
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const createInvoiceCtrl = async (req, res) => {
    const data = matchedData(req);
    try {
        /* const clientData = await clientsModel.create({
            ...data,
            parent_user_id: req.session.user.id,
        }); */

        /* const createBalancesPromises = id_business.map(async (id) => {
            try {
                await balancesModel.create({
                    client_id: clientData.id,
                    business_id: id,
                    amount: 0,
                });
            } catch (error) {
                console.error(error);
                handleHttpError(res, 'Error al crear balances en el negocio');
            }
        });

        await Promise.all(createBalancesPromises); */

        resOkData(res, { data });
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al crear factura');
    }
};

module.exports = {
    createInvoiceCtrl,
};
