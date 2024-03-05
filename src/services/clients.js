import models from '../models/index.js';

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
  for (const balance of balancesToDelete) {
    await models.balancesModel.update(
      { active: false },
      {
        where: { id: balance, amount: 0 },
      },
    );
  }
}

// Función para crear nuevos balances
async function createBalances(clientId, balancesToCreate) {
  for (const businessId of balancesToCreate) {
    await models.balancesModel.create({
      client_id: clientId,
      business_id: businessId,
      amount: 0,
    });
  }
}
export {
  findBalancesToDelete,
  findBalancesToCreate,
  deleteBalances,
  createBalances,
};
