const express = require('express');
const router = express.Router();
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  validatorGetProductsAndServicesByClient,
  validatorGetProductsAndServicesUpdateByClient,
  validatorProductsAndServicesUpdateDefault,
} = require('../validators/products_and_services');
const {
  productsAndServicesByClientCtrl,
  productsAndServicesUpdateCtrl,
  productsAndServicesCreateCtrl,
  productsAndServicesDefaultUpdateCtrl,
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
router.post(
  '/',
  isLoggedInTrue,
  validatorGetProductsAndServicesUpdateByClient,
  productsAndServicesCreateCtrl,
);
router.patch(
  '/:id',
  isLoggedInTrue,
  validatorProductsAndServicesUpdateDefault,
  productsAndServicesDefaultUpdateCtrl,
);

module.exports = router;
