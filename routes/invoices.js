const express = require('express');
const router = express.Router();
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  createInvoiceCtrl,
  getInvoicesByClientCtrl,
  getInvoicesOfUserCtrl,
} = require('../controllers/invoices.controller');
const {
  validatorCreateInvoice,
  validateInvoiceClientId,
  validateQueryInvoicesOfUser,
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
router.post(
  '/create/:id',
  isLoggedInTrue,
  validatorCreateInvoice,
  checkClientOfUser,
  checkIfBalanceCoverInvoice,
  createInvoiceCtrl,
);

module.exports = router;
