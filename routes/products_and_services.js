const express = require('express');
const router = express.Router();
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
    validatorGetProductsAndServicesByClient,
} = require('../validators/products_and_services');
const {
    productsAndServicesByClientCtrl,
} = require('../controllers/productsAndServicesByClientCtrl');

router.get(
    '/:business_id',
    isLoggedInTrue,
    validatorGetProductsAndServicesByClient,
    productsAndServicesByClientCtrl,
);

module.exports = router;
