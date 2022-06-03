var express = require("express");

var router = express.Router();  

router.use("/",require("./products"));
router.use("/shopify",require("./shopify"));

module.exports = router;