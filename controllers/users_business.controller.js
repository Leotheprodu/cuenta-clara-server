const { users_businessModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');
const { matchedData } = require('express-validator');
const userBusinessChecker = require('../utils/userBusinessChecker');

const businessByUserCtrl = async (req, res) => {
  const { active } = matchedData(req);
  const whereData = {
    user_id: req.session.user.id,
  };
  if (parseInt(active) === 1) {
    whereData.active = true;
  }
  console.log('whereData', whereData);
  console.log(typeof active);
  try {
    const business = await users_businessModel.findAll({
      where: whereData,
    });
    if (!business) {
      handleHttpError(res, 'El negocio no existe', 404);
      return;
    }
    resOkData(res, business);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al buscar los negocios del usuario');
  }
};
const favoriteBusinessCtrl = async (req, res) => {
  const { id } = matchedData(req);
  try {
    const user_id = req.session.user.id;
    let business = await users_businessModel.findAll({
      where: { user_id },
    });

    if (!business) {
      handleHttpError(res, 'El usuario no tiene negocios', 404);
      return;
    }

    // Encontrar el negocio con default === true
    const defaultBusiness = await oldDefaultBusiness(business);
    // Si se encontró un negocio con default === true, actualizarlo a false
    if (defaultBusiness) {
      await defaultBusiness.update({ default: false });
    }

    // Encontrar el negocio correspondiente al ID de la solicitud
    const selectedBusiness = await businessSelected(business, id);

    // Si se encontró un negocio con el ID de la solicitud, establecerlo como predeterminado
    if (selectedBusiness) {
      await selectedBusiness.update({ default: true });
    }

    // Recuperar la lista actualizada de negocios
    business = await userBusinessChecker(req, user_id);

    resOkData(res, business);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al seleccionar negocio');
  }
};
const businessSelected = async (business, id) => {
  return await business.find((item) => item.id == id);
};
const oldDefaultBusiness = async (business) => {
  return await business.find((item) => item.default === true);
};
module.exports = {
  businessByUserCtrl,
  favoriteBusinessCtrl,
};
