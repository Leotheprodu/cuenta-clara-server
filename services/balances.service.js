const { mainUserId, BalanceControlPrice } = require('../config/constants');
const {
  clientsModel,
  balancesModel,
  balance_rechargesModel,
} = require('../models');
class Balances {
  async getBalance(user_id) {
    try {
      const client = await clientsModel.findOne({
        where: { user_id, parent_user_id: mainUserId },
        include: [balancesModel],
      });
      return client.balance;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener balance');
    }
  }
  async createBalanceRecharge(balance, amount, status, invoiceId = null) {
    try {
      const newBalanceRecharge = await balance_rechargesModel.create({
        amount,
        balance_id: balance.id,
        client_id: balance.client_id,
        status,
        invoiceId,
      });
      return newBalanceRecharge;
    } catch (error) {
      console.error(error);
      throw new Error('Error al crear recarga de balance');
    }
  }

  async updateBalance(balance, amount) {
    try {
      const newBalance = balance.amount * 1 + amount;

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

  async updateBalancebyInvoice(user_id, total, status, invoiceId) {
    try {
      const invoiceAmount = total * BalanceControlPrice;
      const balance = await this.getBalance(user_id);
      await this.createBalanceRecharge(
        balance,
        invoiceAmount,
        status,
        invoiceId,
      );

      const newBalance = await this.updateBalance(balance, invoiceAmount);

      return newBalance;
    } catch (error) {
      console.error(error);

      throw new Error('Error al actualizar balance por factura');
    }
  }
}

module.exports = Balances;
