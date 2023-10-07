const express = require('express');
const router = express.Router();
const {
    clientsCtrl,
    createClientsCtrl,
    deleteClientsCtrl,
    updateClientsCtrl,
    clientCtrl,
} = require('../controllers/clients');
const {
    validatorCreateClients,
    validatorDeleteClient,
    validatorQueryClients,
    validatorUpdateClients,
    validatorGetClient,
} = require('../validators/clients');
const { isLoggedInTrue } = require('../middleware/isLoggedIn');
const checkClientOfUser = require('../middleware/checkClientOfUser');

router.get('/', isLoggedInTrue, validatorQueryClients, clientsCtrl);
router.get('/:id', isLoggedInTrue, validatorGetClient, clientCtrl);
router.post('/', isLoggedInTrue, validatorCreateClients, createClientsCtrl);
router.put('/', isLoggedInTrue, validatorUpdateClients, updateClientsCtrl);
router.delete(
    '/:id',
    isLoggedInTrue,
    checkClientOfUser,
    validatorDeleteClient,
    deleteClientsCtrl,
);

module.exports = router;
