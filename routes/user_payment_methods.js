import express from 'express';
const router = express.Router();
import { isLoggedInTrue } from '../middleware/isLoggedIn.js';
import { validatorGetProductsAndServicesByClient } from '../validators/products_and_services.js';
import {
  paymentMethodsCtrl,
  createPaymentMethodsCtrl,
} from '../controllers/user_payment_methods.controller.js';
import { validatorCreateUserPaymentMethods } from '../validators/user_payment_methods.js';
import checkBusinessOfUser from '../middleware/checkBusinessOfUser.js';

router.get(
  '/:business_id',
  validatorGetProductsAndServicesByClient,
  paymentMethodsCtrl,
);
router.post(
  '/:id',
  isLoggedInTrue,
  validatorCreateUserPaymentMethods,
  checkBusinessOfUser,
  createPaymentMethodsCtrl,
);

export default router;
