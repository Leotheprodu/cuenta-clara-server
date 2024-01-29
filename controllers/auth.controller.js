const { matchedData } = require('express-validator');
const {
  usersModel,
  clientsModel,
  role_usersModel,
  temp_token_poolModel,
  users_businessModel,
  balancesModel,
  products_and_servicesModel,
  user_payment_methodsModel,
  balances_rechargesModel,
} = require('../models');
const Users = require('../services/users.service');
const { handleHttpError } = require('../utils/handleError');
const { PasswordCompare, PasswordEncrypt } = require('../utils/handlePassword');
const {
  resUsersSessionData,
  resOkData,
} = require('../utils/handleOkResponses');
const { createTempToken, newToken } = require('../utils/handleTempToken');
const { sendAEmail } = require('../utils/handleSendEmail');
const idGenerator = require('../utils/idGenerator');
const {
  initialBalance,
  appName,
  emailUser,
  verifyEmailLink,
  paymentMethod,
  BusinessConfigInfo,
  paymentStatus,
} = require('../config/constants');
const userBusinessChecker = require('../utils/userBusinessChecker');
const { cookieSessionInject } = require('../utils/handleCookie');
const users = new Users();
const loginCtrl = async (req, res) => {
  try {
    //Import the data provided by the client already filtered

    const data = matchedData(req);

    const { email, password } = data;

    //extract user data from database
    const userData = await users.findUserWithPasswordByEmail(email);

    if (!userData) {
      handleHttpError(res, 'El usuario no existe', 404);
      return;
    }
    if (userData.active === 0) {
      handleHttpError(res, 'El usuario esta desactivado', 401);
      return;
    }
    const hashPassword = await userData.password;

    const check = await PasswordCompare(password, hashPassword);
    if (!check) {
      handleHttpError(res, 'Contraseña Incorrecta', 401);
      return;
    }
    cookieSessionInject(req, res);
    userData.set('password', undefined, { strict: false });
    await userBusinessChecker(req, userData.id);
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
    req = matchedData(req);
    const { address, ...restOfReq } = req;
    const password = await PasswordEncrypt(req.password);
    const body = { ...restOfReq, password };
    const { username, email } = body;
    console.log(body);
    // Se agrega la info de body a la base de datos usuarios
    const data = await usersModel.create(body);
    if (!data) {
      handleHttpError(res, 'Error creando usuario');
      return;
    }
    //Se genera un token random
    const token = await newToken();

    //Crea el link que va a ser enviar al correo del nuevo usuario para verificar el email
    const link = `${verifyEmailLink}${token}`;

    // Crea el objeto con el nombre y correo del remitente del correo a enviar
    const from = {
      name: `${appName}`,
      email: `${emailUser}`,
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
      `Bienvenido(a) a ${appName}`,
    );

    // Con esta linea cuando se registra no devuelve en password en la respuesta

    const appClient = {
      username,
      email,
      cellphone: data.cellphone,
      token: `${data.username.toLowerCase().slice(0, 2)}-${idGenerator()}`,
      user_id: data.id,
      parent_user_id: BusinessConfigInfo.userId,
      country: data.country,
      address: address,
    };
    const userClient = {
      username: 'Cliente 1',
      token: `cp-${idGenerator()}`,
      parent_user_id: data.id,
      country: data.country,
    };
    data.set('password', undefined, { strict: false });
    await role_usersModel.create({ user_id: data.id, role_id: 3 });
    const newUserBusiness = await users_businessModel.create({
      user_id: data.id,
      name: `Negocio de ${data.username}`,
      default: true,
    });
    await products_and_servicesModel.create({
      user_id: data.id,
      name: 'Predeterminado',
      description: 'Servicio predeterminado',
      unit: 'unidad',
      unit_price: 1,
      default: true,
      business_id: newUserBusiness.id,
      code: `${data.id}-${newUserBusiness.id}-1`,
      type: 'service',
    });
    //Crea cliente de la aplicacion para el usuario
    const client = await clientsModel.create(appClient);

    const userBalance = await balancesModel.create({
      client_id: client.id,
      business_id: BusinessConfigInfo.businessId,
      amount: initialBalance,
    });
    //crea cliente predeterminado para el usuario
    const userClientData = await clientsModel.create(userClient);
    await balancesModel.create({
      client_id: userClientData.id,
      business_id: newUserBusiness.id,
      amount: 0,
    });
    const userPaymentMethod = await user_payment_methodsModel.create({
      payment_method_id: paymentMethod.cash.id,
      business_id: newUserBusiness.id,
      payment_method_cellphone: client.cellphone || null,
      payment_method_email: client.email,
      payment_method_description: ' pago en efectivo',
    });
    await balances_rechargesModel.create({
      amount: 0,
      balance_amount: initialBalance,
      status: paymentStatus.completed.name,
      client_id: client.id,
      balance_id: userBalance.id,
      user_payment_methods_id: userPaymentMethod.id,
      balances_types_id: 1,
    });
    resOkData(res, data);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error creando usuario');
  }
};
const emailVerifyCtrl = async (req, res) => {
  const { token } = matchedData(req);

  const tempToken = async (token) => {
    try {
      const result = await temp_token_poolModel.findOne({
        where: { token, type: 'sign_up' },
      });
      return result;
    } catch (error) {
      handleHttpError(res, 'Token invalido');
    }
  };
  try {
    const tempTokenData = await tempToken(token);
    const userData = await usersModel.findOne({
      where: { email: tempTokenData.user_email },
    });
    if (!userData) {
      handleHttpError(res, 'El usuario no existe', 404);
      return;
    }
    const unverifiedRole = await role_usersModel.findOne({
      where: { user_id: userData.id, role_id: 3 },
    });

    await tempTokenData.destroy();
    await unverifiedRole.destroy();
    await role_usersModel.create({ user_id: userData.id, role_id: 2 });

    resOkData(res, userData);
  } catch (error) {
    console.log(error);
    handleHttpError(res, 'Error verificando correo electronico');
  }
};
const ckeckSessCtrl = async (req, res) => {
  try {
    if (req.session.isLoggedIn) {
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
