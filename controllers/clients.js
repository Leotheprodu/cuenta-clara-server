const { matchedData } = require('express-validator');
const { clientsModel, balancesModel } = require('../models');
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
        console.log({ balancesToDelete });
        // Identificar los nuevos balances a crear
        const balancesToCreate = await findBalancesToCreate(
            existingBalances,
            id_business,
        );
        console.log({ balancesToCreate });
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

// Función para identificar los balances a borrar
async function findBalancesToDelete(existingBalances, id_business) {
    return existingBalances
        .filter((balance) => !id_business.includes(balance.business_id))
        .map((balance) => balance.id);
}

// Función para identificar los nuevos balances a crear
async function findBalancesToCreate(existingBalances, id_business) {
    return id_business.filter(
        (id) =>
            !existingBalances.some(
                (existingBalance) => existingBalance.business_id === id,
            ),
    );
}

// Función para eliminar balances
async function deleteBalances(balancesToDelete) {
    await balancesModel.destroy({
        where: { id: balancesToDelete, amount: 0 },
    });
}

// Función para crear nuevos balances
async function createBalances(clientId, balancesToCreate) {
    for (const businessId of balancesToCreate) {
        await balancesModel.create({
            client_id: clientId,
            business_id: businessId,
            amount: 0,
        });
    }
}

const deleteClientsCtrl = async (req, res) => {
    const { id } = matchedData(req);

    try {
        await clientsModel.findOne({ where: { id } });

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
