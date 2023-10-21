const express = require('express');
const router = express.Router();
const { businessByUserCtrl } = require('../controllers/users_business');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');

router.get('/', isLoggedInTrue, businessByUserCtrl);

module.exports = router;
