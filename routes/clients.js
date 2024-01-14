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
router.get(
  '/dashboardInfo/:token',
  validatorDashboardClient,
  dashboardClientCtrl,
);

module.exports = router;
