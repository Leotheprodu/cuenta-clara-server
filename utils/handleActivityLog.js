const { activity_logsModel } = require('../models');
/**
 * Create activity log
 * @param {*} res
 * @param {string} action
 * @param {number} reference_id
 */
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
    return await activity_logsModel.create(log);
  }
};
module.exports = { createActivityLog };
