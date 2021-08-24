const { verifyToken } = require("../utils/token");

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = await verifyToken(token);
  next();
};
module.exports = {
  auth,
};
