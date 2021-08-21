const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const auth = async (req, res, next) => {
  console.log("hiii");
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userTckn = decoded.userTckn;
    next();
  });
};
module.exports = {
  auth,
};
