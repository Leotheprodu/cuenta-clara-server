const express = require('express');
const router = express.Router();
const {
  businessByUserCtrl,
  favoriteBusinessCtrl,
  createBusinessCtrl,
  deactivateBusinessCtrl,
  updateBusinessCtrl,
} = require('../controllers/users_business.controller');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  validatorGetBussiness,
  validatorGetFavoriteBussiness,
  validatorCreateBusiness,
  validatorUpdateBussiness,
} = require('../validators/business');
const checkBusinessOfUser = require('../middleware/checkBusinessOfUser');

router.get('/', isLoggedInTrue, validatorGetBussiness, businessByUserCtrl);
router.post('/', isLoggedInTrue, validatorCreateBusiness, createBusinessCtrl);
router.get(
  '/favorite/:id',
  isLoggedInTrue,
  validatorGetFavoriteBussiness,
  checkBusinessOfUser,
  favoriteBusinessCtrl,
);
router.get(
  '/deactivate/:id',
  isLoggedInTrue,
  validatorGetFavoriteBussiness,
  checkBusinessOfUser,
  deactivateBusinessCtrl,
);
router.post(
  '/:id',
  isLoggedInTrue,
  validatorUpdateBussiness,
  checkBusinessOfUser,
  updateBusinessCtrl,
);

module.exports = router;
