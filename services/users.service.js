import models from '../models/index.js';
const { usersModel, employeesModel } = models;
class Users {
  async findUserWithPasswordByEmail(email) {
    const userData = await usersModel.scope('withPassword').findOne({
      where: { email },
    });
    return userData;
  }
  async findEmployeeWithPasswordByUsername(username) {
    const userData = await employeesModel.scope('withPassword').findOne({
      where: { username },
    });
    return userData;
  }
}

export default Users;
