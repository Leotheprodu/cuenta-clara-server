const express = require('express');
const router = express.Router();
const {
  loginCtrl,
  signUpCtrl,
  logoutCtrl,
  emailVerifyCtrl,
  ckeckSessCtrl,
} = require('../controllers/auth.controller');
const {
  validatorLogin,
  validatorSignUp,
  validatorGetToken,
} = require('../validators/auth');
const { isLoggedInTrue, isLoggedInFalse } = require('../middleware/isLoggedIn');
const checkEmailExist = require('../middleware/checkEmailExist');

router.post('/login', isLoggedInFalse, validatorLogin, loginCtrl);
router.post('/signup', validatorSignUp, checkEmailExist, signUpCtrl);
router.get('/logout', isLoggedInTrue, logoutCtrl);
router.get('/email-verification/:token', validatorGetToken, emailVerifyCtrl);
router.get('/check-session', ckeckSessCtrl);
module.exports = router;
