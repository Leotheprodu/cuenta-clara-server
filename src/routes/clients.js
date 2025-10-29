import express from 'express';
import {
  clientsCtrl,
  createClientsCtrl,
  deactivateClientsCtrl,
  updateClientsCtrl,
  clientCtrl,
  dashboardClientCtrl,
  getClientLinkInfoCtrl,
} from '../controllers/clients.controller.js';
import {
  validatorCreateClients,
  validatorDeactivateClient,
  validatorQueryClients,
  validatorUpdateClients,
  validatorGetClient,
  validatorDashboardClient,
  validatorGetLinkInfo,
} from '../validators/clients.js';
import { isLoggedInTrue } from '../middleware/isLoggedIn.js';
import checkClientOfUser from '../middleware/checkClientOfUser.js';
import { checkPin } from '../middleware/checkPin.js';

const router = express.Router();

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
router.post('/get-link-info', validatorGetLinkInfo, getClientLinkInfoCtrl);

export default router;
