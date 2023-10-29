const express = require('express');
const router = express.Router();
const {
    clientsCtrl,
    createClientsCtrl,
    deactivateClientsCtrl,
    updateClientsCtrl,
    clientCtrl,
} = require('../controllers/clients');
const {
    validatorCreateClients,
    validatorDeactivateClient,
    validatorQueryClients,
    validatorUpdateClients,
    validatorGetClient,
} = require('../validators/clients');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const checkClientOfUser = require('../middleware/checkClientOfUser');

router.get('/', isLoggedInTrue, validatorQueryClients, clientsCtrl);
router.get(
    '/:id',
    isLoggedInTrue,
    validatorGetClient,
    checkClientOfUser,
    clientCtrl,
);
router.post('/', isLoggedInTrue, validatorCreateClients, createClientsCtrl);
router.put('/', isLoggedInTrue, validatorUpdateClients, updateClientsCtrl);
router.get(
    '/deactivate/:id',
    isLoggedInTrue,
    validatorDeactivateClient,
    checkClientOfUser,
    deactivateClientsCtrl,
);

module.exports = router;
