const { matchedData } = require('express-validator');
const {
  invoicesModel,
  invoice_detailsModel,
  transactionsModel,
} = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const createInvoiceCtrl = async (req, res) => {
  const data = matchedData(req);
  const { business_id, total, client_id, date, invoice_details } = data;
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
      paid: false,
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

      resOkData(res, { createInvoice, invoice_details });
    }
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al crear factura');
  }
};
const getInvoicesOfUserCtrl = async (req, res) => {
  const user_id = req.session.user.id;
  const { is_paid } = matchedData(req);
  const paid = is_paid === 'true' ? true : false;
  try {
    const invoices = await invoicesModel.findAll({
      where: {
        parent_user_id: user_id,
        paid,
      },
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
      include: invoice_detailsModel,
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
