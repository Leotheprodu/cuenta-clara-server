const { matchedData } = require('express-validator');
const {
  invoicesModel,
  invoice_detailsModel,
  transactionsModel,
  users_businessModel,
  clientsModel,
  payment_methodsModel,
  payment_statusModel,
} = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');
const Balances = require('../services/balances.service');
const idGenerator = require('../utils/idGenerator');

const balances = new Balances();
const createInvoiceCtrl = async (req, res) => {
  const data = matchedData(req);
  const {
    business_id,
    total,
    client_id,
    date,
    invoice_details,
    status = 'pending',
    payment_method_id = 1,
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
        'completed',
        createInvoice.id,
      );
      req.session.balance = balance;

      if (status === 'paid') {
        const transaction = await transactionsModel.create({
          id: idGenerator(12),
          amount: total,
          status_id: 2,
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
    const invoices = await invoicesModel.findAll({
      where: {
        client_id: id,
        parent_user_id: user_id,
      },
      attributes: {
        exclude: [
          'client_id',
          'parent_user_id',
          'createdAt',
          'updatedAt',
          'business_id',
        ],
      },
      include: [
        {
          model: users_businessModel,
          attributes: ['id', 'name'],
        },
        {
          model: clientsModel,
          attributes: ['id', 'username'],
        },
        {
          model: invoice_detailsModel,
          attributes: {
            exclude: [
              'description',
              'default',
              'createdAt',
              'updatedAt',
              'invoiceId',
            ],
          },
        },
        {
          model: transactionsModel,
          through: { attributes: [] },
          attributes: {
            exclude: [
              'parent_user_id',
              'createdAt',
              'updatedAt',
              'client_id',
              'payment_method_id',
              'status_id',
            ],
          },
          include: [
            {
              model: payment_methodsModel,
              attributes: ['id', 'name'],
            },
            {
              model: payment_statusModel,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
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

module.exports = {
  createInvoiceCtrl,
  getInvoicesByClientCtrl,
  getInvoicesOfUserCtrl,
};
