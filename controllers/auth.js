const { matchedData } = require('express-validator');
const {
    usersModel,
    role_usersModel,
    temp_token_poolModel,
} = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { compare, encrypt } = require('../utils/handlePassword');
const {
    resUsersSessionData,
    resOkData,
} = require('../utils/handleOkResponses');
const { createTempToken, newToken } = require('../utils/handleTempToken');
const { sendAEmail } = require('../utils/handleSendEmail');
const { RefreshSessionData } = require('../utils/handleRefreshSessionData');

const loginCtrl = async (req, res) => {
    try {
        //Import the data provided by the client already filtered
        const data = matchedData(req);

        const { email, password } = data;

        //extract user data from database
        const userData = await usersModel.scope('withPassword').findOne({
            where: { email },
        });
        if (!userData) {
            handleHttpError(res, 'El usuario no existe', 404);
            return;
        }
        if (userData.activo === 0) {
            handleHttpError(res, 'El usuario esta desactivado', 401);
            return;
        }
        const hashPassword = await userData.password;

        const check = await compare(password, hashPassword);
        if (!check) {
            handleHttpError(res, 'Contraseña Incorrecta', 401);
            return;
        }
        if (process.env.NODE_ENV === 'production') {
            res.cookie('sessionId', req.session.id, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000 * 24,
                sameSite: 'none',
            });
        } else {
            res.cookie('sessionId', req.session.id, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000 * 24,
            });
        }
        userData.set('password', undefined, { strict: false });
        req.session.user = userData;
        req.session.isLoggedIn = true;
        resUsersSessionData(req, res, 'El Usuario ha iniciado sesion');
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error durante el inicio de sesion');
    }
};
const logoutCtrl = async (req, res) => {
    try {
        req.session.isLoggedIn = false;
        resUsersSessionData(req, res, 'El Usuario ha cerrado sesion');
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al cerrar sesion');
    }
};
const signUpCtrl = async (req, res) => {
    try {
        //Importa la data suministrada por el cliente ya filtrada
        req = matchedData(req);

        //Hashea el password del cliente
        const password = await encrypt(req.password);

        // Con spread operator agregamos los datos de la solicitud cambiando el password por el password hasheado
        const body = { ...req, password };

        // Aplica destructuring para tener a la mano estos valores
        const { username, email } = body;

        // Se agrega la info de body a la base de datos usuarios
        const data = await usersModel.create(body);

        //Se genera un token random
        const token = await newToken();

        //Crea el link que va a ser enviar al correo del nuevo usuario para verificar el email
        const link = `${process.env.LINK_HOST}/verificar-email/${token}`;

        // Crea el objeto con el nombre y correo del remitente del correo a enviar
        const from = {
            name: 'CuentaFacil',
            email: `${process.env.EMAIL_USER}`,
        };

        // Crea el objeto con la data que necesita la plantilla para ser renderizada y enviada
        const dataToEJS = { username, link };

        // Agrega el token en la base de datos asignada al correo del usuario
        await createTempToken(token, email, 'sign_up');

        // Envia el correo a usuario para que se verifique
        await sendAEmail(
            'user-sign_up',
            dataToEJS,
            from,
            email,
            `Bienvenido a CuentaFacil ${username}`,
        );

        // Con esta linea cuando se registra no devuelve en password en la respuesta

        data.set('password', undefined, { strict: false });
        if (data) {
            await role_usersModel.create({ user_id: data.id, role_id: 3 });
        }
        //Respuesta
        resOkData(res, data);
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error creando usuario');
    }
};
const emailVerifyCtrl = async (req, res) => {
    async function tempToken(token) {
        try {
            const result = await temp_token_poolModel.findOne({
                where: { token, type: 'sign_up' },
            });
            return result;
        } catch (error) {
            handleHttpError(res, 'Token invalido');
        }
    }
    try {
        const { token } = matchedData(req);
        const tempTokenData = await tempToken(token);
        const userData = await usersModel.findOne({
            where: { email: tempTokenData.user_email },
        });
        const unverifiedRole = await role_usersModel.findOne({
            user_id: userData.id,
            role_id: 3,
        });
        await tempTokenData.destroy();
        await unverifiedRole.destroy();
        await role_usersModel.create({ user_id: userData.id, role_id: 2 });

        res.send({
            message: 'Correo electronico verificado',
            email: userData.email,
        });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'Error verificando correo electronico');
    }
};
const ckeckSessCtrl = async (req, res) => {
    try {
        if (req.session.isLoggedIn) {
            await RefreshSessionData(req);
            resUsersSessionData(req, res, 'Sesion activa');
        } else {
            handleHttpError(res, 'El usuario no ha iniciado sesion');
        }
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'Error al verificar sesion');
    }
};
module.exports = {
    loginCtrl,
    logoutCtrl,
    signUpCtrl,
    emailVerifyCtrl,
    ckeckSessCtrl,
};
