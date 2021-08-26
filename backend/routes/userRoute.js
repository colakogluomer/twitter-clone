const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/:username", userController.getProfile);

module.exports = router;
