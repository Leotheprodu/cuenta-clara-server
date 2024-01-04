const express = require('express');
const router = express.Router();
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  validatorGetProductsAndServicesByClient,
} = require('../validators/products_and_services');
const {
  paymentMethodsCtrl,
} = require('../controllers/user_payment_methods.controller');

router.get(
  '/:business_id',
  isLoggedInTrue,
  validatorGetProductsAndServicesByClient,
  paymentMethodsCtrl,
);

module.exports = router;
