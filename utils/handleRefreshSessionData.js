const { usersModel, clientsModel } = require('../models/');
const { refreshUserRoles } = require('./handleRoles');
const userBusinessChecker = require('./userBusinessChecker');
const RefreshSessionData = async (req) => {
  const id = req.session.user.id;

  const data = await usersModel.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  const client =
    (await clientsModel.findOne({
      where: { user_id: id },
    })) || null;
  const balance = client ? await client.getBalance() : 0;
  req.session.user = data;
  req.session.roles = await refreshUserRoles(data.id);
  req.session.client = client;
  req.session.balance = balance;

  await userBusinessChecker(req, id);
};

module.exports = { RefreshSessionData };
