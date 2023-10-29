const express = require('express');
const router = express.Router();
const {
    businessByUserCtrl,
    favoriteBusinessCtrl,
} = require('../controllers/users_business');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const { validatorGetBussiness } = require('../validators/business');
const checkBusinessOfUser = require('../middleware/checkBusinessOfUser');

router.get('/', isLoggedInTrue, businessByUserCtrl);
router.get(
    '/favorite/:id',
    isLoggedInTrue,
    validatorGetBussiness,
    checkBusinessOfUser,
    favoriteBusinessCtrl,
);

module.exports = router;
