const express = require('express');
const router = express.Router();
const {
    clientsCtrl,
    createClientsCtrl,
    deleteClientsCtrl,
} = require('../controllers/clients');
const {
    validatorCreateClients,
    validatorDeleteClient,
    validatorQueryClients,
} = require('../validators/clients');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const checkClientOfUser = require('../middleware/checkClientOfUser');

router.get('/', isLoggedInTrue, validatorQueryClients, clientsCtrl);
router.post('/', isLoggedInTrue, validatorCreateClients, createClientsCtrl);
router.delete(
    '/:id',
    isLoggedInTrue,
    checkClientOfUser,
    validatorDeleteClient,
    deleteClientsCtrl,
);

module.exports = router;
