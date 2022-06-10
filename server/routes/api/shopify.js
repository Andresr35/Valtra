var express = require('express');
var router = express.Router();
const morgan = require('morgan');
const client = require('../../utils/shopify');
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
    }).catch((error) =>{res.json({
        status: error.response,
        })
      });  
})


//SAME THING AS LAST BUT WITH GRAPHQL
router.put('/orderss', async (req,res) =>{
  // console.log(req.body.data[0].Name);
  // console.log(req.body.data[0].Tracking);
  //start getting data and fulfilment numbers
   try{
    //------------------------------------------these will be the variables that change depending on what order we're on
    console.log("Fufilling");
    for(const orderObject in req.body.data){
      const name = req.body.data[orderObject].Name,
      shippingCompany = "fedex",
      trackingNumber = req.body.data[orderObject].Tracking;
      var jsonString = "",  
      fulfillmentOrderId = "";
      const result = await client.client2.query({
        data:
          `query getFulfillmentOrderbyName{
          orders(first:1,query:"name:${name}") {
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
      console.log(result.body.data.orders);

    //----------------------------------------------getting the fufillment order id
    for(const orderNode in result.body.data.orders.nodes){
      //just checking what order name we're looking at
      console.log(result.body.data.orders.nodes[orderNode].name)
      for(const node in result.body.data.orders.nodes[orderNode].fulfillmentOrders.nodes){
        //logging the fufillment id
        console.log(result.body.data.orders.nodes[orderNode].fulfillmentOrders.nodes[node].id);
        fulfillmentOrderId = result.body.data.orders.nodes[orderNode].fulfillmentOrders.nodes[node].id
      }
    };
    //----------------------------------------------Starting to mutate fufillment data
      try{
          const mutResult =await client.client2.query({
          data:{
            "query": 
              `mutation fulfillmentCreateV2($fulfillment: FulfillmentV2Input!) {
                fulfillmentCreateV2(fulfillment: $fulfillment) {
                  fulfillment {
                    status
                    order {
                      name
                    }
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }`,
            "variables":{
              "fulfillment": {
                "lineItemsByFulfillmentOrder": [
                  {
                    "fulfillmentOrderId": `${fulfillmentOrderId}`
                  }
                ],
                "notifyCustomer": true,
                "trackingInfo": {
                  "company": `${shippingCompany}`,
                  "number": `${trackingNumber}`
                }
              }            
            },
          },
        })
        jsonString = mutResult;
        //---------------------------------------------Error catching on mutation
      }catch(error){
        console.log(error.stack);
      }

            
    }
    console.log("done")

    //-----------------------------------------------json result if everything goes well
    res.status(200).json({
        status:"success",
        mutResult:jsonString.body
    });
    //--------------------------------------------------last catfch error
  }catch(err){
      console.log("error at query")
      console.log(err.stack);
      res.status(404).json("something broke");
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