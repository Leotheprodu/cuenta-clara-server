const { matchedData } = require('express-validator');
const { clientsModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const clientsCtrl = async (req, res) => {
    const { activo } = matchedData(req);
    const filtro = {
        where: { parent_user_id: req.session.user.id },
        order: [['username', 'ASC']],
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
const clientCtrl = async (req, res) => {
    const { id } = matchedData(req);
    try {
        const clientsData = await clientsModel.findOne({
            where: { parent_user_id: req.session.user.id, id },
        });
        resOkData(res, clientsData);
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al intentar mostrar el cliente');
    }
};
const createClientsCtrl = async (req, res) => {
    const data = matchedData(req);

    try {
        const clientData = await clientsModel.create({
            ...data,
            parent_user_id: req.session.user.id,
        });
        resOkData(res, clientData);
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al intentar crear cliente');
    }
};
const updateClientsCtrl = async (req, res) => {
    const data = matchedData(req);

    try {
        const clientData = await clientsModel.update(
            {
                ...data,
                parent_user_id: req.session.user.id,
            },
            {
                where: { id: data.id },
            },
        );
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
    updateClientsCtrl,
    clientCtrl,
};
