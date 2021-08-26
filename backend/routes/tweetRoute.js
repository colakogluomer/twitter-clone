const router = require("express").Router();
const tweetController = require("../controllers/tweetController");

router.post("/add", tweetController.create);

module.exports = router;
