const { matchedData } = require('express-validator');
const { handleHttpError } = require('../utils/handleError');
const { BalanceControlPrice } = require('../config/constants');

const checkIfBalanceCoverInvoice = (req, res, next) => {
  const { total } = matchedData(req);
  const { balance } = req.session;
  if (balance >= total * BalanceControlPrice) {
    next();
  } else {
    handleHttpError(res, 'El saldo no cubre');
  }
};
module.exports = checkIfBalanceCoverInvoice;
