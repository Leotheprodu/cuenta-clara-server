//balanceByClientCtrl

const { matchedData } = require('express-validator');
const { balancesModel, balances_typesModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { resOkData } = require('../utils/handleOkResponses');

const balanceByClientCtrl = async (req, res) => {
  const { id } = matchedData(req);

  try {
    const balance = await balancesModel.findAll({
      where: { client_id: id },
    });
    resOkData(res, balance);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al intentar mostrar el balance del cliente');
  }
};
const getBalanceTypeCtrl = async (req, res) => {
  const { id } = matchedData(req);

  try {
    const balance = await balances_typesModel.findByPk(id);
    resOkData(res, balance);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al intentar mostrar el plan de Recarga');
  }
};
const ClientBalancesCtrl = async (req, res) => {
  try {
    const defaultUserBusiness = req.session.userBusiness;
    const balances = await balancesModel.findAll({
      where: { business_id: defaultUserBusiness },
    });

    resOkData(res, balances);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al intentar mostrar los balances');
  }
};
const getBalancesTypesCtrl = async (req, res) => {
  try {
    const balancesTypes = await balances_typesModel.findAll();

    resOkData(res, balancesTypes);
  } catch (error) {
    console.error(error);
    handleHttpError(res, 'Error al intentar mostrar los planes de Recarga');
  }
};
module.exports = {
  balanceByClientCtrl,
  ClientBalancesCtrl,
  getBalancesTypesCtrl,
  getBalanceTypeCtrl,
};
