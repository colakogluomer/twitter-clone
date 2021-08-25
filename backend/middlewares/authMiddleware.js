const ApiError = require("../utils/ApiError");
const { verifyToken } = require("../utils/token");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await verifyToken(token);
    if (
      decoded.type !== process.env.LOGIN_TOKEN ||
      process.env.REGISTER_TOKEN
    ) {
      throw new ApiError(404, "Unauthorized");
    }
    next();
  } catch (error) {}
};
module.exports = {
  auth,
};
