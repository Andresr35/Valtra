var express = require('express');
var router = express.Router();
const morgan = require('morgan');
var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language



const client = require('../../utils/shopify');
const { query } = require('express');
router.use(express.json());


// GET ALL ORDERS
router.get('/orders', (req,res) =>{
    console.log("got data from shopify");
    client.client.get({path :'/orders'})
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

const querystring =` {
  orders(first:10) {
    edges {
      node {
        id
        ...on Order {
          name
        }
        totalWeight
        fulfillable
        displayFulfillmentStatus
        fulfillments(first:10){
          id
        }
        fulfillmentOrders(first:10,displayable:true){
          edges{
            node{
              id
            }
          }
        }
      }
    }
  }
}`


//SAME THING AS LAST BUT WITH GRAPHQL
router.put('/orderss', async (req,res) =>{
   try{
     const result = await client.client2.query({
        data: `query ok{
          orders(first:20) {
            nodes {
              id
              name
              displayFulfillmentStatus
              fulfillmentOrders(first:10,displayable:true){
                  nodes{
                    id
                  }
              }
            }
          }
        }`,
      });
      for(const orderNode in result.body.data.orders.nodes){
        for(const node in result.body.data.orders.nodes[orderNode].fulfillmentOrders.nodes){
          console.log(result.body.data.orders.nodes[orderNode].fulfillmentOrders.nodes[node].id);
        }
      }
      res.json({
        points:result.body.extensions.cost,
        data:result.body.data.orders,
        length:result.body.data.orders.nodes.length,

      });
      console.log(req.body)
    }catch(err){
      console.log(err.stack);
    }
      
});



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