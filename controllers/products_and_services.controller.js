const { matchedData } = require('express-validator');
const { products_and_servicesModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const productsAndServicesByClientCtrl = async (req, res) => {
  const { business_id } = matchedData(req);
  const user_id = req.session.user.id;
  try {
    const products_and_services = await products_and_servicesModel.findAll({
      where: { business_id, user_id },
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
module.exports = {
  productsAndServicesByClientCtrl,
};
