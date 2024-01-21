const express = require('express');
const router = express.Router();
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  createInvoiceCtrl,
  getInvoicesByClientCtrl,
  /*   getInvoicesOfUserCtrl, */
  addTransactionCtrl,
  deleteInvoicesByClientCtrl,
  getInvoicesByTokenCtrl,
  getTransactionsDashboardCtrl,
  getDetailsDashboardCtrl,
} = require('../controllers/invoices.controller');
const {
  validatorCreateInvoice,
  validateInvoiceClientId,
  /*  validateQueryInvoicesOfUser, */
  validatorAddTransaction,
} = require('../validators/invoices');
const checkClientOfUser = require('../middleware/checkClientOfUser');
const checkIfBalanceCoverInvoice = require('../middleware/checkIfBalanceCoverInvoice');
const { checkPin } = require('../middleware/checkPin');
const {
  validatorDashboardClient,
  validatorDashboardTransactions,
} = require('../validators/clients');
/* router.get(
  '/',
  isLoggedInTrue,
  validateQueryInvoicesOfUser,
  getInvoicesOfUserCtrl,
); */
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
router.post(
  '/dashboard-info/:token',
  checkPin,
  validatorDashboardClient,
  getInvoicesByTokenCtrl,
);
router.post(
  '/dashboard-transactions/:token',
  checkPin,
  validatorDashboardTransactions,
  getTransactionsDashboardCtrl,
);
router.post(
  '/dashboard-invoice-details/:token',
  checkPin,
  validatorDashboardTransactions,
  getDetailsDashboardCtrl,
);
module.exports = router;
