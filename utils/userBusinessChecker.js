const { users_businessModel } = require('../models');
const userBusinessChecker = async (req, user_id) => {
    const business = await users_businessModel.findAll({ where: { user_id } });
    req.session.userBusiness = business.map((item) => item.id);
    return business;
};
module.exports = userBusinessChecker;
