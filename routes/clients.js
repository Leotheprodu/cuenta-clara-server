const express = require('express');
const router = express.Router();
const {
  clientsCtrl,
  createClientsCtrl,
  deactivateClientsCtrl,
  updateClientsCtrl,
  clientCtrl,
  dashboardClientCtrl,
} = require('../controllers/clients.controller');
const {
  validatorCreateClients,
  validatorDeactivateClient,
  validatorQueryClients,
  validatorUpdateClients,
  validatorGetClient,
  validatorDashboardClient,
} = require('../validators/clients');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const checkClientOfUser = require('../middleware/checkClientOfUser');
const { checkPin } = require('../middleware/checkPin');

router.get('/', isLoggedInTrue, validatorQueryClients, clientsCtrl);
router.get(
  '/:id',
  isLoggedInTrue,
  validatorGetClient,
  checkClientOfUser,
  clientCtrl,
);
router.post('/', isLoggedInTrue, validatorCreateClients, createClientsCtrl);
router.put('/', isLoggedInTrue, validatorUpdateClients, updateClientsCtrl);
router.get(
  '/deactivate/:id',
  isLoggedInTrue,
  validatorDeactivateClient,
  checkClientOfUser,
  deactivateClientsCtrl,
);
router.post(
  '/dashboard-info/:token',
  checkPin,
  validatorDashboardClient,
  dashboardClientCtrl,
);

module.exports = router;
