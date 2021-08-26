const userService = require("../services/userService");

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserByUsername(req.params.username);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
};
