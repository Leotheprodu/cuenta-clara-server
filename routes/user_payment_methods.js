const express = require('express');
const router = express.Router();
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  validatorGetProductsAndServicesByClient,
} = require('../validators/products_and_services');
const {
  paymentMethodsCtrl,
  createPaymentMethodsCtrl,
} = require('../controllers/user_payment_methods.controller');
const {
  validatorCreateUserPaymentMethods,
} = require('../validators/user_payment_methods');
const checkBusinessOfUser = require('../middleware/checkBusinessOfUser');

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

module.exports = router;
