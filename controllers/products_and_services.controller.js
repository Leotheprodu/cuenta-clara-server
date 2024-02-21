const { matchedData } = require('express-validator');
const { products_and_servicesModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const productsAndServicesByClientCtrl = async (req, res) => {
  const { business_id } = matchedData(req);
  const user_id = req.session.user.id;
  try {
    if (business_id === 0) {
      handleHttpError(res, 'El business id no puede ser 0', 400);
      return;
    }
    const products_and_services = await products_and_servicesModel.findAll({
      where: { business_id, user_id },
      attributes: {
        exclude: ['createdAt', 'updateAt'],
      },
    });
    resOkData(res, products_and_services);
  } catch (error) {
    console.error(error);
    handleHttpError(
      res,
      'Error al obtener los productos y servicios del cliente',
    );
  }
};
const productsAndServicesUpdateCtrl = async (req, res) => {
  const data = matchedData(req);
  const user_id = req.session.user.id;
  try {
    if (data.user_id !== user_id) {
      handleHttpError(
        res,
        'No puedes actualizar productos de otro usuario',
        400,
      );
      return;
    }
    const products_and_services = await products_and_servicesModel.findOne({
      where: { id: data.id },
    });
    if (!products_and_services) {
      handleHttpError(res, 'El producto o servicio no existe', 404);
      return;
    }
    await products_and_services.update(data);
    resOkData(res, { message: 'Producto o servicio actualizado' });
  } catch (error) {
    console.error(error);
    handleHttpError(
      res,
      'Error al obtener los productos y servicios del cliente',
    );
  }
};
module.exports = {
  productsAndServicesByClientCtrl,
  productsAndServicesUpdateCtrl,
};
