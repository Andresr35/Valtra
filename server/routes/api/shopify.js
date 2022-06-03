var express = require('express');
var router = express.Router();
const morgan = require('morgan');


const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET_KEY;
const scopes = 'read_orders';
const client = require('../../utils/shopify');
router.use(express.json());


// GET ALL ORDERS
router.get('/orders', (req,res) =>{
    client.get({path :'/orders'})
    .then((result) => {
        res.json({
            result: result.body.orders
        })
    })
    .catch((error) =>{res.json({
        status: error.response,
        })
    });  
})
module.exports = router;