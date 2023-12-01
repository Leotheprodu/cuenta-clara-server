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
  validateQueryInvoicesOfUser,
} = require('../validators/invoices');
const checkClientOfUser = require('../middleware/checkClientOfUser');
// BUG este middleware no funciona, no deja registrar la factura
/* const checkIfBalanceCoverInvoice = require('../middleware/checkIfBalanceCoverInvoice'); */
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
  '/create',
  isLoggedInTrue,
  validatorCreateInvoice,
  createInvoiceCtrl,
);

module.exports = router;
