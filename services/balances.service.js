const { BusinessConfigInfo, billingPrice } = require('../config/constants');
const {
  clientsModel,
  balancesModel,
  balances_updatesModel,
} = require('../models');
class Balances {
  async getBalanceOfUser(user_id) {
    try {
      const client = await clientsModel.findOne({
        where: { user_id, parent_user_id: BusinessConfigInfo.userId },
        include: [balancesModel],
      });
      return client.balances.find(
        (balance) => balance.business_id === BusinessConfigInfo.businessId,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener balance');
    }
  }
  async getBalanceOfClient(id, business_id) {
    try {
      const client = await clientsModel.findOne({
        where: { id },
        include: [balancesModel],
      });
      return client.balances.find(
        (balance) => balance.business_id === business_id,
      );
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener balance');
    }
  }
  async createBalanceUpdate(balance, amount, invoiceId = null) {
    try {
      const newBalanceUpdate = await balances_updatesModel.create({
        amount,
        balance_id: balance.id,
        client_id: balance.client_id,
        invoiceId,
      });
      return newBalanceUpdate;
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear recarga de balance');
    }
  }

  async updateBalance(balance, amount) {
    try {
      const newBalance = balance.amount * 1 + amount * 1;

      await balancesModel.update(
        { amount: newBalance },
        { where: { id: balance.id } },
      );
      return newBalance;
    } catch (error) {
      console.error(error);
      throw new Error('Error al recargar balance');
    }
  }

  async updateBalancebyInvoice(user_id, total, invoiceId) {
    try {
      const invoiceAmount = total * billingPrice;
      const balance = await this.getBalanceOfUser(user_id);
      await this.createBalanceUpdate(balance, invoiceAmount, invoiceId);

      const newBalance = await this.updateBalance(balance, invoiceAmount);

      return newBalance;
    } catch (error) {
      console.error(error);

      throw new Error('Error al actualizar balance por factura');
    }
  }
}

module.exports = Balances;
