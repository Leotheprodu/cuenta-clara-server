const { mainUserId } = require('../config/constants');
const { clientsModel, balancesModel } = require('../models/');
const { refreshUserRoles } = require('./handleRoles');
const userBusinessChecker = require('./userBusinessChecker');
const RefreshSessionData = async (req) => {
  const id = req.session.user.id;
  const clients =
    (await clientsModel.findAll({
      where: { user_id: id },
      include: [balancesModel],
    })) || null;
  const appClient = clients.find(
    (client) => client.parent_user_id === mainUserId,
  );
  req.session.roles = await refreshUserRoles(id);
  const balance = req.session.roles.includes(1)
    ? 1000000
    : appClient.balance.amount;
  req.session.client = clients;
  req.session.balance = balance * 1;
  await userBusinessChecker(req, id);
};

module.exports = { RefreshSessionData };
