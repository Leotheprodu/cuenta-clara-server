import models from '../models/index.js';

const createActivityLog = async (req, action, reference_id) => {
  if (req.session.isLoggedIn) {
    const { user, employee } = req.session;
    const { isEmployee, employeeName } = employee;
    const { username } = user;
    const log = {
      username: isEmployee ? employeeName : username,
      action,
      reference_id,
      parent_user_id: user.id,
    };
    return await models.activity_logsModel.create(log);
  }
};

export { createActivityLog };
