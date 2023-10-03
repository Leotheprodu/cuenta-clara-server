const { usersModel } = require('../models/');
const { refreshUserRoles } = require('./handleRoles');
const RefreshSessionData = async (req) => {
    const id = req.session.user.id;

    const data = await usersModel.findByPk(id, {
        attributes: { exclude: ['password'] },
    });
    req.session.user = data;
    req.session.roles = await refreshUserRoles(data.id);
};

module.exports = { RefreshSessionData };
