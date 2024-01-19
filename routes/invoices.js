const express = require('express');
const router = express.Router();
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  createInvoiceCtrl,
  getInvoicesByClientCtrl,
  getInvoicesOfUserCtrl,
  addTransactionCtrl,
  deleteInvoicesByClientCtrl,
} = require('../controllers/invoices.controller');
const {
  validatorCreateInvoice,
  validateInvoiceClientId,
  validateQueryInvoicesOfUser,
  validatorAddTransaction,
} = require('../validators/invoices');
const checkClientOfUser = require('../middleware/checkClientOfUser');
const checkIfBalanceCoverInvoice = require('../middleware/checkIfBalanceCoverInvoice');
router.get(
  '/',
  isLoggedInTrue,
  validateQueryInvoicesOfUser,
  getInvoicesOfUserCtrl,
);
router.get(
  '/:id',
  isLoggedInTrue,
  validateInvoiceClientId,
  checkClientOfUser,
  getInvoicesByClientCtrl,
);
router.delete(
  '/delete/:id',
  isLoggedInTrue,
  validateInvoiceClientId,
  deleteInvoicesByClientCtrl,
);
router.post(
  '/create/:id',
  isLoggedInTrue,
  validatorCreateInvoice,
  checkClientOfUser,
  checkIfBalanceCoverInvoice,
  createInvoiceCtrl,
);
router.post(
  '/add-transaction/:id',
  isLoggedInTrue,
  validatorAddTransaction,
  checkClientOfUser,
  addTransactionCtrl,
);

module.exports = router;
