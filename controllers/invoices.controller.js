const { matchedData } = require('express-validator');
const {
  invoicesModel,
  invoice_detailsModel,
  transactionsModel,
} = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');
const Balances = require('../services/balances.service');
const Invoices = require('../services/invoices.service');
const idGenerator = require('../utils/idGenerator');
const {
  invoicesStatus,
  balancesStatus,
  paymentStatus,
  paymentMethod,
} = require('../config/constants');
const invoices = new Invoices();
const balances = new Balances();
const createInvoiceCtrl = async (req, res) => {
  const data = matchedData(req);
  const {
    business_id,
    total,
    client_id,
    date,
    invoice_details,
    status = invoicesStatus.pending,
    payment_method_id = paymentMethod.cash,
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
      client_id,
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
        balancesStatus.complete,
        createInvoice.id,
      );
      req.session.balance = balance;

      if (status === invoicesStatus.paid) {
        const transaction = await transactionsModel.create({
          id: idGenerator(12),
          amount: total,
          status_id: paymentStatus.complete,
          payment_method_id,
          parent_user_id: user_id,
          client_id,
          date,
          description: 'Pago realizado inmediatamente al crear factura',
        });
        await createInvoice.addTransaction(transaction);
      }
      resOkData(res, { createInvoice, invoice_details, newBalance: balance });
    }
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al crear factura');
  }
};
const getInvoicesOfUserCtrl = async (req, res) => {
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
};

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

module.exports = {
  createInvoiceCtrl,
  getInvoicesByClientCtrl,
  getInvoicesOfUserCtrl,
};
