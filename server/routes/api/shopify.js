var express = require('express');
var router = express.Router();
const morgan = require('morgan');



const client = require('../../utils/shopify');
router.use(express.json());


// GET ALL ORDERS
router.get('/orders', (req,res) =>{
    console.log("got data from shopify");
    client.get({path :'/orders'})
    .then((result) => {
        res.status(200).json({
            status: 200,
            result: result.body.orders
        })
        
    })
    .catch((error) =>{res.json({
        status: error.response,
        })
    });  
})

// GET ONE ORDER
router.get('/orders/:id', (req,res) =>{
    client.get({path :`/orders/${req.params.id}`})
    .then((result) => {
        res.json({
            status:"good job",
            result: result.body.order
        })
    })
    .catch((error) =>{res.json({
        status: error.response,
        })
    });  
})













module.exports = router;