var express = require('express');
var router = express.Router();
const morgan = require('morgan');
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

const querystring = `data: {
  "query": "query OrderMetafields($ownerId: ID!) {
    order(id: $ownerId) {
      metafields(first: 3) {
        edges {
          node {
            namespace
            key
            value
          }
        }
      }
    }
  }",
  "variables": {
    "ownerId": "gid://shopify/Order/148977776"
  },
},
`

//SAME THING AS LAST BUT WITH GRAPHQL
router.put('/orderss', async (req,res) =>{
  //start getting data and fulfilment numbers
   try{
    const name = "#1003";
    const result = await client.client2.query({
      data:
        `query getFulfillmentOrderbyName{
        orders(first:10,query:"name:${name}") {
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
    })
    console.log(result.body.data.orders);
    for(const orderNode in result.body.data.orders.nodes){
      console.log(result.body.data.orders.nodes[orderNode].name)
      for(const node in result.body.data.orders.nodes[orderNode].fulfillmentOrders.nodes){
        console.log(result.body.data.orders.nodes[orderNode].fulfillmentOrders.nodes[node].id);
      }
    };
    try{
      const mutResult = client.client2.query({
        

      })
    }catch(error){
      console.log(err.stack);
    }

    res.status(200).json(
      "success"
    );

      
  }
    
  
    
    
    
    catch(err){
      console.log("error at query")
      console.log(err.stack);
      res.status(404).json(
        err
      );
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