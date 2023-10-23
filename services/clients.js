const { balancesModel } = require('../models');

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
module.exports = {
    findBalancesToDelete,
    findBalancesToCreate,
    deleteBalances,
    createBalances,
};
