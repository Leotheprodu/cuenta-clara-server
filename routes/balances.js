const express = require('express');
const router = express.Router();
const {
  balanceByClientCtrl,
  ClientBalancesCtrl,
  getBalancesTypesCtrl,
  getBalanceTypeCtrl,
  rechargeBalancesCtrl,
} = require('../controllers/balances.controller');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  validatorGetBalanceByClient,
  validatorRechargeBalance,
} = require('../validators/balances');
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
router.post(
  '/recharge',
  isLoggedInTrue,
  validatorRechargeBalance,
  rechargeBalancesCtrl,
);
module.exports = router;
