const { matchedData } = require('express-validator');
const { clientsModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const clientsCtrl = async (req, res) => {
    const { activo } = matchedData(req);
    const filtro = {
        where: { related_parent_user: req.session.user.id },
    };
    if (activo === 'true') {
        filtro.where.activo = true;
    } else if (activo === 'false') {
        filtro.where.activo = false;
    }
    try {
        const clientsData = await clientsModel.findAll(filtro);
        resOkData(res, clientsData);
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al intentar mostrar clientes');
    }
};
const createClientsCtrl = async (req, res) => {
    const data = matchedData(req);

    try {
        const clientData = await clientsModel.create({
            ...data,
            related_parent_user: req.session.user.id,
        });
        resOkData(res, clientData);
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al intentar crear cliente');
    }
};
const deleteClientsCtrl = async (req, res) => {
    const { id } = matchedData(req);

    try {
        console.log(id);
        const gwet = await clientsModel.findOne({ where: { id } });
        console.log(gwet);
        const [updatedRowCount] = await clientsModel.update(
            { activo: 0 },
            { where: { id } },
        );
        if (updatedRowCount === 0) {
            handleHttpError(res, 'No se ha eliminado ningun usuario');
            return;
        } else {
            resOkData(res, { message: 'Cliente eliminado' });
        }
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al intentar crear cliente');
    }
};

module.exports = {
    clientsCtrl,
    createClientsCtrl,
    deleteClientsCtrl,
};
