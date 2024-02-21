const express = require('express');
const router = express.Router();
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  validatorGetProductsAndServicesByClient,
  validatorGetProductsAndServicesUpdateByClient,
} = require('../validators/products_and_services');
const {
  productsAndServicesByClientCtrl,
  productsAndServicesUpdateCtrl,
} = require('../controllers/products_and_services.controller');

router.get(
  '/:business_id',
  isLoggedInTrue,
  validatorGetProductsAndServicesByClient,
  productsAndServicesByClientCtrl,
);
router.put(
  '/',
  isLoggedInTrue,
  validatorGetProductsAndServicesUpdateByClient,
  productsAndServicesUpdateCtrl,
);

module.exports = router;
