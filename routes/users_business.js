const express = require('express');
const router = express.Router();
const {
  businessByUserCtrl,
  favoriteBusinessCtrl,
  createBusinessCtrl,
  deactivateBusinessCtrl,
} = require('../controllers/users_business.controller');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  validatorGetBussiness,
  validatorGetFavoriteBussiness,
  validatorCreateBusiness,
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

module.exports = router;
