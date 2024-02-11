const { BusinessConfigInfo } = require('../config/constants');
const {
  clientsModel,
  employeesModel,
  balancesModel,
  users_businessModel,
} = require('../models/');
const { refreshUserRoles } = require('./handleRoles');
const userBusinessChecker = require('./userBusinessChecker');
const RefreshSessionData = async (req) => {
  const id = req.session.user.id;
  const client =
    (await clientsModel.findAll({
      where: { user_id: id },
      include: [
        {
          model: balancesModel,
          attributes: ['id', 'amount'],
          include: [
            {
              model: users_businessModel,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
      attributes: ['id', 'parent_user_id', 'active'],
    })) || null;
  if (req.session.employee.isEmployee) {
    const employee = await employeesModel.findOne({
      where: { username: req.session.employee.employeeName },
    });
    req.session.employee = {
      isEmployee: true,
      isAdmin: employee.admin,
      active: employee.active,
      employeeName: employee.username,
    };
  } else {
    req.session.employee = {
      isEmployee: false,
      isAdmin: true,
      active: false,
      employeeName: '',
    };
  }
  const appClient = client.find(
    (client) => client.parent_user_id === BusinessConfigInfo.userId,
  );
  req.session.roles = await refreshUserRoles(id);
  const balance = req.session.roles.includes(1)
    ? 1000000
    : appClient.balances[0].amount;
  req.session.client = client;
  req.session.balance = balance * 1;
  await userBusinessChecker(req, id);
};

module.exports = { RefreshSessionData };
