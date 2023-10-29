const express = require('express');
const router = express.Router();
const {
    balanceByClientCtrl,
    ClientBalancesCtrl,
} = require('../controllers/balances');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const { validatorGetBalanceByClient } = require('../validators/balances');
const checkClientOfUser = require('../middleware/checkClientOfUser');

router.get(
    '/:id',
    isLoggedInTrue,
    validatorGetBalanceByClient,
    checkClientOfUser,
    balanceByClientCtrl,
);
router.get('/', isLoggedInTrue, ClientBalancesCtrl);

module.exports = router;
