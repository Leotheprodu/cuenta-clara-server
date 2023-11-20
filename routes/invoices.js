const express = require('express');
const router = express.Router();
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  createInvoiceCtrl,
  getInvoicesByClientCtrl,
  getInvoicesOfUserCtrl,
} = require('../controllers/invoices');
const {
  validatorCreateInvoice,
  validateInvoiceClientId,
} = require('../validators/invoices');
const checkClientOfUser = require('../middleware/checkClientOfUser');
router.get('/', isLoggedInTrue, getInvoicesOfUserCtrl);
router.get(
  '/:id',
  isLoggedInTrue,
  validateInvoiceClientId,
  checkClientOfUser,
  getInvoicesByClientCtrl,
);
router.post(
  '/create',
  isLoggedInTrue,
  validatorCreateInvoice,
  createInvoiceCtrl,
);

module.exports = router;
