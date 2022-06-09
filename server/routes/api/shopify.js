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

//SAME THING AS LAST BUT WITH GRAPHQL
router.get('/orderss', (req,res) =>{
    const data =  client.query({
        data: {
          "query": `mutation M($input: InventoryAdjustQuantityInput!) {
                          inventoryAdjustQuantity(input: $input) {
                            inventoryLevel {
                              id
                              available
                              incoming
                              item {
                                id
                                sku
                              }
                              location {
                                id
                                name
                              }
                            }
                          }
                        }`,
          "variables": {
            "input": {
              "inventoryLevelId": "gid://shopify/InventoryLevel/964427794?inventory_item_id=43729076",
              "availableDelta": 3
            }
          },
        },
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