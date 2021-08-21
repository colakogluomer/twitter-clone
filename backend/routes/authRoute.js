const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
