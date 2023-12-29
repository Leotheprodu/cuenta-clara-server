const express = require('express');
const router = express.Router();
const {
  balanceByClientCtrl,
  ClientBalancesCtrl,
  getBalancesTypesCtrl,
  getBalanceTypeCtrl,
} = require('../controllers/balances.controller');
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
router.get('/types/balance', getBalancesTypesCtrl);
router.get(
  '/types/balance/:id',
  validatorGetBalanceByClient,
  getBalanceTypeCtrl,
);

module.exports = router;
