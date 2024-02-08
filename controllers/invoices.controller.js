const { matchedData } = require('express-validator');
const {
  invoicesModel,
  invoice_detailsModel,
  transactionsModel,
  clientsModel,
} = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');
const Balances = require('../services/balances.service');
const Invoices = require('../services/invoices.service');
const {
  invoicesStatus,
  paymentStatus,
  paymentMethod,
} = require('../config/constants');
const dateNow = require('../utils/handleDate');
const invoices = new Invoices();
const balances = new Balances();
const createInvoiceCtrl = async (req, res) => {
  const data = matchedData(req);
  const {
    business_id,
    total,
    id,
    date,
    invoice_details,
    status = invoicesStatus.pending,
    payment_method_id = paymentMethod.cash.id,
  } = data;
  const user_id = req.session.user.id;
  try {
    //por cada elemento del array invoice_details cambiar en code por la concatenacion de user_id, business_id y code
    invoice_details.forEach((element) => {
      element.code = `${user_id}-${business_id}-${element.code}`;
    });

    const createInvoice = await invoicesModel.create({
      parent_user_id: user_id,
      business_id,
      date,
      client_id: id,
      total_amount: total,
      status,
    });
    if (!createInvoice) {
      handleHttpError(res, 'Error al crear factura');
      return;
    } else {
      const createInvoicesDetailsPromises = invoice_details.map(
        async (invoiceDetail) => {
          try {
            await invoice_detailsModel.create({
              invoiceId: createInvoice.id,
              description: invoiceDetail.description,
              quantity: invoiceDetail.quantity,
              unit_price: invoiceDetail.unit_price,
              code: invoiceDetail.code,
              subtotal: invoiceDetail.subtotal,
            });
          } catch (error) {
            console.error(error);
            handleHttpError(res, 'Error al crear detalles de factura');
          }
        },
      );
      await Promise.all(createInvoicesDetailsPromises);
      const balance = await balances.updateBalancebyInvoice(
        user_id,
        total * -1,
        createInvoice.id,
      );
      req.session.balance = balance;

      if (status === invoicesStatus.paid) {
        const transaction = await transactionsModel.create({
          amount: total,
          status_id: paymentStatus.completed.id,
          payment_method_id,
          parent_user_id: user_id,
          client_id: id,
          date,
          description: 'Pago realizado inmediatamente al crear factura',
        });
        await createInvoice.addTransaction(transaction);
      } else if (invoicesStatus.pending) {
        const clientBalance = await balances.getBalanceOfClient(
          id,
          business_id,
        );
        await balances.createBalanceUpdate(
          clientBalance,
          total * -1,
          createInvoice.id,
        );
        console.log(createInvoice);
        await balances.updateBalance(clientBalance, total * -1);
      }
      resOkData(res, {
        createInvoice,
        invoice_details,
        newUserBalance: balance,
      });
    }
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al crear factura');
  }
};

/* const getInvoicesOfUserCtrl = async (req, res) => {
  const user_id = req.session.user.id;
  const { status } = matchedData(req);
  const whereClause = {
    parent_user_id: user_id,
  };

  // Agregar la condición de status si está presente
  if (status) {
    whereClause.status = status;
  }
  try {
    const invoices = await invoicesModel.findAll({
      where: whereClause,
      include: [invoice_detailsModel, transactionsModel],
    });
    if (!invoices) {
      handleHttpError(res, 'Error al obtener facturas');
      return;
    } else {
      resOkData(res, invoices);
    }
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al obtener facturas');
  }
}; */

const getInvoicesByClientCtrl = async (req, res) => {
  const { id } = matchedData(req);
  const user_id = req.session.user.id;
  try {
    const result = await invoices.findInvoicesofUserByClient(id, user_id);
    if (!result) {
      handleHttpError(res, 'Error al obtener facturas');
      return;
    } else {
      resOkData(res, result);
    }
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al obtener facturas');
  }
};
const getInvoicesByTokenCtrl = async (req, res) => {
  const { token, pin: pinData } = matchedData(req);
  try {
    const clientData = await clientsModel.scope('withPin').findOne({
      where: { token },
      attributes: ['id', 'parent_user_id', 'pin'],
    });
    const { id, pin, parent_user_id } = clientData.dataValues;
    if (pin !== pinData) {
      handleHttpError(res, 'Invalid PIN');
      return;
    }
    const result = await invoices.findInvoicesofUserByToken(id, parent_user_id);
    if (!result) {
      handleHttpError(res, 'Error al obtener facturas');
      return;
    } else {
      resOkData(res, result);
    }
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al obtener facturas');
  }
};
const getTransactionsDashboardCtrl = async (req, res) => {
  const { token, pin: pinData, invoice_id } = matchedData(req);
  try {
    const clientData = await clientsModel.scope('withPin').findOne({
      where: { token },
      attributes: ['pin'],
    });
    const { pin } = clientData.dataValues;
    if (pin !== pinData) {
      handleHttpError(res, 'Invalid PIN');
      return;
    }
    const result = await invoices.findInvoicebyIDforTransactions(invoice_id);
    if (!result) {
      handleHttpError(res, 'Error al obtener trasacciones');
      return;
    } else {
      resOkData(res, result);
    }
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al obtener transacciones');
  }
};
const getDetailsDashboardCtrl = async (req, res) => {
  const { token, pin: pinData, invoice_id } = matchedData(req);
  try {
    const clientData = await clientsModel.scope('withPin').findOne({
      where: { token },
      attributes: ['pin'],
    });
    const { pin } = clientData.dataValues;
    if (pin !== pinData) {
      handleHttpError(res, 'Invalid PIN');
      return;
    }
    const result = await invoices.findInvoicebyIDforDetails(invoice_id);
    if (!result) {
      handleHttpError(res, 'Error al obtener trasacciones');
      return;
    } else {
      resOkData(res, result);
    }
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al obtener transacciones');
  }
};
const deleteInvoicesByClientCtrl = async (req, res) => {
  const { id } = matchedData(req);
  const user_id = req.session.user.id;
  try {
    const result = await invoicesModel.findOne({
      where: { id },
    });

    if (!result.parent_user_id === user_id) {
      handleHttpError(res, 'La Factura no le pertenece al usuario');
      return;
    }
    if (result.status !== invoicesStatus.pending) {
      handleHttpError(res, 'La Factura no se puede eliminar');
      return;
    }
    if (result.date !== dateNow()) {
      handleHttpError(
        res,
        'Solo se puede eliminar si la factura es del dia de hoy',
      );
      return;
    }
    const clientBalance = await balances.getBalanceOfClient(
      result.client_id,
      result.business_id,
    );
    await balances.createBalanceUpdate(
      clientBalance,
      result.total_amount,
      result.id,
    );
    await balances.updateBalance(clientBalance, result.total_amount);
    await result.update({ status: invoicesStatus.cancelled });
    resOkData(res, { status: invoicesStatus.cancelled });
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al obtener facturas');
  }
};

const addTransactionCtrl = async (req, res) => {
  const data = matchedData(req);
  try {
    const invoice = await invoices.findInvoice(data.invoice_id);
    if (!invoice) {
      handleHttpError(res, 'Error al obtener factura');
      return;
    }
    const balanceInvoice =
      invoice.total_amount -
      invoice.transactions.reduce((acc, transaction) => {
        return acc + parseFloat(transaction.amount);
      }, 0);
    if (balanceInvoice <= 0) {
      handleHttpError(res, 'La factura ya ha sido pagada');
      return;
    }
    if (data.amount > balanceInvoice) {
      handleHttpError(res, 'El monto de la transaccion es mayor al saldo');
      return;
    }
    const clientBalance = await balances.getBalanceOfClient(
      data.client_id,
      invoice.users_business.id,
    );
    const transaction = await transactionsModel.create(data);
    if (!transaction) {
      handleHttpError(res, 'Error al crear transaccion');
      return;
    }
    await invoice.addTransaction(transaction);
    await balances.createBalanceUpdate(clientBalance, data.amount, invoice.id);
    await balances.updateBalance(clientBalance, data.amount);
    //actualiza el status de la factura
    if (balanceInvoice === data.amount && transaction) {
      await invoice.update({ status: invoicesStatus.paid });
    } else if (balanceInvoice > data.amount && transaction) {
      await invoice.update({ status: invoicesStatus.inProcess });
    }

    resOkData(res, {
      data,
    });
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al crear transaccion');
  }
};

module.exports = {
  createInvoiceCtrl,
  getInvoicesByClientCtrl,
  /* getInvoicesOfUserCtrl, */
  addTransactionCtrl,
  deleteInvoicesByClientCtrl,
  getInvoicesByTokenCtrl,
  getTransactionsDashboardCtrl,
  getDetailsDashboardCtrl,
};
