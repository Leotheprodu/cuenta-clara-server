const express = require('express');
const router = express.Router();
const {
  businessByUserCtrl,
  favoriteBusinessCtrl,
} = require('../controllers/users_business.controller');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const {
  validatorGetBussiness,
  validatorGetFavoriteBussiness,
} = require('../validators/business');
const checkBusinessOfUser = require('../middleware/checkBusinessOfUser');

router.get('/', isLoggedInTrue, validatorGetBussiness, businessByUserCtrl);
router.get(
  '/favorite/:id',
  isLoggedInTrue,
  validatorGetFavoriteBussiness,
  checkBusinessOfUser,
  favoriteBusinessCtrl,
);

module.exports = router;
