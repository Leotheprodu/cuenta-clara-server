const { usersModel } = require('../models');
class Users {
  async findUserWithPasswordByEmail(email) {
    const userData = await usersModel.scope('withPassword').findOne({
      where: { email },
    });
    return userData;
  }
}

module.exports = Users;
