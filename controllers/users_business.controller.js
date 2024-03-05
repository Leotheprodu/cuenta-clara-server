import models from '../models';
import { handleHttpError } from '../utils/handleError';
import { resOkData } from '../utils/handleOkResponses';
import { matchedData } from 'express-validator';
import userBusinessChecker from '../utils/userBusinessChecker';
import { paymentMethod } from '../config/constants';
const {
  users_businessModel,
  products_and_servicesModel,
  user_payment_methodsModel,
} = models;

const businessByUserCtrl = async (req, res) => {
  const { active } = matchedData(req);
  const whereData = {
    user_id: req.session.user.id,
  };
  if (parseInt(active) === 1) {
    whereData.active = true;
  }
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

const createBusinessCtrl = async (req, res) => {
  const { name } = matchedData(req);

  try {
    const newUserBusiness = await users_businessModel.create({
      user_id: req.session.user.id,
      name: name,
      default: false,
      active: true,
    });
    await products_and_servicesModel.create({
      user_id: req.session.user.id,
      name: 'Predeterminado',
      description: 'Servicio predeterminado',
      unit: 'unidad',
      unit_price: 1,
      default: true,
      business_id: newUserBusiness.id,
      code: `${req.session.user.id}-${newUserBusiness.id}-1`,
      type: 'service',
    });
    await user_payment_methodsModel.create({
      payment_method_id: paymentMethod.cash.id,
      business_id: newUserBusiness.id,
      payment_method_cellphone: req.session.user.cellphone || null,
      payment_method_email: req.session.user.email,
      payment_method_description: ' pago en efectivo',
    });
    resOkData(res, { message: 'Negocio creado correctamente' });
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al crear el negocio del usuario');
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
const deactivateBusinessCtrl = async (req, res) => {
  const { id } = matchedData(req);
  try {
    const business = await users_businessModel.findOne({
      where: { id },
    });

    if (!business) {
      handleHttpError(res, `el negocio id: ${id} no pertenece al usuario`, 404);
      return;
    } else if (business.default) {
      handleHttpError(res, 'No se puede desactivar el negocio predeterminado');
      return;
    }
    await business.update({
      active: business.active ? false : true,
    });
    resOkData(res, {
      id: business.id,
      active: business.active ? false : true,
    });
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al seleccionar negocio');
  }
};
const updateBusinessCtrl = async (req, res) => {
  const { id, name } = matchedData(req);
  try {
    const business = await users_businessModel.findOne({
      where: { id },
    });

    if (!business) {
      handleHttpError(res, `el negocio id: ${id} no pertenece al usuario`, 404);
      return;
    }
    await business.update({
      name,
    });
    resOkData(res, {
      id: business.id,
      message: 'Negocio actualizado correctamente',
    });
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al actualizar negocio');
  }
};
const businessSelected = async (business, id) => {
  return await business.find((item) => item.id == id);
};
const oldDefaultBusiness = async (business) => {
  return await business.find((item) => item.default === true);
};
export {
  businessByUserCtrl,
  favoriteBusinessCtrl,
  createBusinessCtrl,
  deactivateBusinessCtrl,
  updateBusinessCtrl,
};
