const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req._id = decoded._id;
    next();
  });
};
module.exports = {
  auth,
};
