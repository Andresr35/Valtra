/**
 * Main folder that combines all routes together 
 *
 */

var express = require("express");
var router = express.Router();  

router.use("/",require("./database"));
router.use("/shopify",require("./shopify"));

module.exports = router;