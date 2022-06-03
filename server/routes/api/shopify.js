var express = require('express');
var router = express.Router();

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET_KEY;
const scopes = 'read_orders';

router.get('/order', function (req, res)  {
  const shop = req.query.shop;

})









module.exports = router;