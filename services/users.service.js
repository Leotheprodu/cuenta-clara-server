import models from '../models/index.js';
class UsersService {
  async findUserWithPasswordByEmail(email) {
    const userData = await models.usersModel.scope('withPassword').findOne({
      where: { email },
    });
    return await userData;
  }
  async findEmployeeWithPasswordByUsername(username) {
    const userData = await models.employeesModel.scope('withPassword').findOne({
      where: { username },
    });
    return userData;
  }
}

export default UsersService;
