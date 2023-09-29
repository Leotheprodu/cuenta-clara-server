const express = require('express');
const router = express.Router();
const { loginCtrl } = require('../controllers/auth');
const { validatorLogin } = require('../validators/auth');

/* Login */
router.post('/login', validatorLogin, loginCtrl);

module.exports = router;
