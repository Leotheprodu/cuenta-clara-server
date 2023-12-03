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

  async rechargeBalance(user_id, amount) {
    try {
      const balance = await this.getBalance(user_id);
      const newBalance = balance.amount * 1 + amount;
      await balance_rechargesModel.create({
        amount,
        balance_id: balance.id,
        client_id: balance.client_id,
      });
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

  async updateBalance(user_id, total) {
    try {
      const invoiceAmount = total * BalanceControlPrice;
      const newBalance = await this.rechargeBalance(
        user_id,
        invoiceAmount * -1,
      );
      return newBalance;
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar balance');
    }
  }
}

module.exports = Balances;
