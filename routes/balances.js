const express = require('express');
const router = express.Router();
const {
    balanceByClientCtrl,
    ClientBalancesCtrl,
} = require('../controllers/balances');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const { validatorGetBalanceByClient } = require('../validators/balances');

router.get(
    '/:id',
    isLoggedInTrue,
    validatorGetBalanceByClient,
    balanceByClientCtrl,
);
router.get('/', isLoggedInTrue, ClientBalancesCtrl);

module.exports = router;
