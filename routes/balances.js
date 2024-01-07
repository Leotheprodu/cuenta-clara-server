const express = require('express');
const router = express.Router();
const {
  balanceByClientCtrl,
  ClientBalancesCtrl,
  getBalancesTypesCtrl,
  getBalanceTypeCtrl,
  rechargeBalancesCtrl,
  balancesRechargesCtrl,
  applyBalanceRechargeCtrl,
  cancelBalanceRechargeCtrl,
} = require('../controllers/balances.controller');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  validatorGetBalanceByClient,
  validatorRechargeBalance,
} = require('../validators/balances');
const checkClientOfUser = require('../middleware/checkClientOfUser');
const { isAdmin } = require('../middleware/isAdmin');

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
router.get(
  '/recharges/:id',
  isLoggedInTrue,
  validatorGetBalanceByClient,
  balancesRechargesCtrl,
);
router.patch(
  '/recharges/ok/:id',
  isLoggedInTrue,
  isAdmin,
  validatorGetBalanceByClient,
  applyBalanceRechargeCtrl,
);
router.patch(
  '/recharges/cancel/:id',
  isLoggedInTrue,
  isAdmin,
  validatorGetBalanceByClient,
  cancelBalanceRechargeCtrl,
);
router.post(
  '/recharge',
  isLoggedInTrue,
  validatorRechargeBalance,
  rechargeBalancesCtrl,
);
module.exports = router;
