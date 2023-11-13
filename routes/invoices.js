const express = require('express');
const router = express.Router();

const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const { createInvoiceCtrl } = require('../controllers/invoices');
const { validatorCreateInvoice } = require('../validators/invoices');
/* const { validatorGetBalanceByClient } = require('../validators/balances');
const checkClientOfUser = require('../middleware/checkClientOfUser'); */
/* router.get('/', isLoggedInTrue, ClientBalancesCtrl); */
router.post(
    '/create',
    isLoggedInTrue,
    validatorCreateInvoice,
    createInvoiceCtrl,
);

module.exports = router;
