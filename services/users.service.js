import models from '../models/index.js';
const { usersModel, employeesModel } = models;
class UsersService {
  async findUserWithPasswordByEmail(email) {
    console.log(models);
    const userData = await usersModel.scope('withPassword').findOne({
      where: { email },
    });
    return await userData;
  }
  async findEmployeeWithPasswordByUsername(username) {
    const userData = await employeesModel.scope('withPassword').findOne({
      where: { username },
    });
    return userData;
  }
}

export default UsersService;
