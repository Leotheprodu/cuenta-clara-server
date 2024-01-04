const { matchedData } = require('express-validator');
const {
  user_payment_methodsModel,
  payment_methodsModel,
} = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const paymentMethodsCtrl = async (req, res) => {
  const { business_id } = matchedData(req);
  try {
    const paymentMethods = await user_payment_methodsModel.findAll({
      where: { business_id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'business_id', 'payment_method_id'],
      },
      include: [{ model: payment_methodsModel }],
    });
    resOkData(res, paymentMethods);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al obtener los métodos de pago del negocio');
  }
};
module.exports = {
  paymentMethodsCtrl,
};
