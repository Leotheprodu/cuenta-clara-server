const { matchedData } = require('express-validator');
const { clientsModel, balancesModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');
const {
    findBalancesToDelete,
    findBalancesToCreate,
    deleteBalances,
    createBalances,
} = require('../services/clients');

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
    const { id_business } = data;
    try {
        const clientData = await clientsModel.create({
            ...data,
            parent_user_id: req.session.user.id,
        });

        const createBalancesPromises = id_business.map(async (id) => {
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

        await Promise.all(createBalancesPromises);

        resOkData(res, clientData);
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al intentar crear cliente');
    }
};

const updateClientsCtrl = async (req, res) => {
    const data = matchedData(req);
    const { id_business } = data;
    const clientId = data.id;
    console.log({ id_business });
    try {
        // Actualizar datos del cliente
        const updatedClient = await clientsModel.update(
            {
                ...data,
                parent_user_id: req.session.user.id,
            },
            {
                where: { id: clientId },
                returning: true,
            },
        );

        // Obtener los balances existentes del cliente
        const existingBalances = await balancesModel.findAll({
            where: { client_id: clientId },
        });
        // Identificar los IDs de balances a borrar (amount igual a 0)
        const balancesToDelete = await findBalancesToDelete(
            existingBalances,
            id_business,
        );
        // Identificar los nuevos balances a crear
        const balancesToCreate = await findBalancesToCreate(
            existingBalances,
            id_business,
        );
        // Realizar la eliminación de balances (solo si amount es igual a 0)
        await deleteBalances(balancesToDelete);

        // Realizar la creación de nuevos balances
        await createBalances(clientId, balancesToCreate);

        resOkData(res, updatedClient[1][0]);
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al actualizar cliente');
    }
};

const deactivateClientsCtrl = async (req, res) => {
    const { id } = matchedData(req);

    try {
        const client = await clientsModel.findOne({ where: { id } });
        const activo = client.activo;
        const [updatedRowCount] = await clientsModel.update(
            { activo: activo == 0 ? 1 : 0 },
            { where: { id } },
        );
        if (updatedRowCount === 0) {
            handleHttpError(
                res,
                activo == 0
                    ? 'No se pudo activar el cliente'
                    : 'No se pudo desactivar el cliente',
            );
            return;
        } else {
            resOkData(res, {
                message:
                    activo == 0
                        ? 'Cliente activado correctamente'
                        : 'Cliente desactivado correctamente',
            });
        }
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al intentar activar/desactivar cliente');
    }
};

module.exports = {
    clientsCtrl,
    createClientsCtrl,
    deactivateClientsCtrl,
    updateClientsCtrl,
    clientCtrl,
};
