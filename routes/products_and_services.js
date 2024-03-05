import express from 'express';
const router = express.Router();
import { isLoggedInTrue } from '../middleware/isLoggedIn.js';
import {
  validatorGetProductsAndServicesByClient,
  validatorGetProductsAndServicesUpdateByClient,
  validatorProductsAndServicesUpdateDefault,
} from '../validators/products_and_services.js';
import {
  productsAndServicesByClientCtrl,
  productsAndServicesUpdateCtrl,
  productsAndServicesCreateCtrl,
  productsAndServicesDefaultUpdateCtrl,
} from '../controllers/products_and_services.controller.js';

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

export default router;
