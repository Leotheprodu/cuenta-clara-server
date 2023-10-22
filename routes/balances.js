const express = require('express');
const router = express.Router();
const { balanceByClientCtrl } = require('../controllers/balances');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const { validatorGetBalanceByClient } = require('../validators/balances');

router.get(
    '/:id',
    isLoggedInTrue,
    validatorGetBalanceByClient,
    balanceByClientCtrl,
);

module.exports = router;
