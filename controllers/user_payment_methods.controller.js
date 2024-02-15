const { matchedData } = require('express-validator');
const {
  user_payment_methodsModel,
  payment_methodsModel,
  users_businessModel,
} = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');
const { createActivityLog } = require('../utils/handleActivityLog');

const paymentMethodsCtrl = async (req, res) => {
  const { business_id } = matchedData(req);
  try {
    const paymentMethods = await user_payment_methodsModel.findAll({
      where: { business_id, active: true },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'business_id', 'payment_method_id'],
      },
      include: [
        { model: payment_methodsModel },
        { model: users_businessModel, attributes: ['id', 'name', 'user_id'] },
      ],
    });
    resOkData(res, paymentMethods);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al obtener los métodos de pago del negocio');
  }
};
const createPaymentMethodsCtrl = async (req, res) => {
  const resp = matchedData(req);
  const data = {
    ...resp,
    business_id: parseInt(resp.id),
    id: undefined,
  };
  try {
    const newPaymentMethod = await user_payment_methodsModel.create(data);
    await createActivityLog(
      req,
      'userPaymentMethod-create',
      newPaymentMethod.id,
    );
    resOkData(res, newPaymentMethod);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al crear el método de pago');
  }
};
module.exports = {
  paymentMethodsCtrl,
  createPaymentMethodsCtrl,
};
