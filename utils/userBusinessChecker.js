import models from '../models/index.js';
const { users_businessModel } = models;

const userBusinessChecker = async (req, user_id) => {
  const business = await users_businessModel.findAll({ where: { user_id } });
  req.session.userBusiness = business.map((item) => item.id);
  return business;
};
export default userBusinessChecker;
