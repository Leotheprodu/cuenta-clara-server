const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { BalanceControlPrice } = require('../config/constants');

const checkIfBalanceCoverInvoice = (req, res, next) => {
  const { total } = matchedData(req);
  const { balance } = req.session;
  if (total === 0) {
    handleHttpError(res, 'El total de la factura no puede ser 0');
    return;
  }
  if (balance.amount >= total * BalanceControlPrice) {
    next();
  } else {
    handleHttpError(res, 'No tiene suficiente saldo para registrar la factura');
    return;
  }
};
module.exports = checkIfBalanceCoverInvoice;
