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
    console.log("Running....");
    if(!req.body.data){
      console.log("No JSON received")
      res.status(404).json({
        status:"null",
        message:"no JSON recieved"
      })
    }
    else{
      var failedOrders = "",fufilledOrders = "",alreadyFufilled = "",obj=`{"failed":[],"alreadyFufilled":[],"fufilled":[]}`;
      const resData = JSON.parse(obj);
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

        // ----------------------------------------------------checking to see if the order name could be queried
        if(!result.body.data.orders.nodes.length){
          failedOrders += `${req.body.data[orderObject].Name}, `
          //console.log(`${req.body.data[orderObject].Name} could not be found or DNE`)
        }else{
          //----------------------------------------------getting the fufillment order id
          for(const orderNode in result.body.data.orders.nodes){         
              //this just gets the name
              if(result.body.data.orders.nodes[orderNode].displayFulfillmentStatus == "FULFILLED"){

                alreadyFufilled += `${result.body.data.orders.nodes[orderNode].name}, `
                resData["alreadyFufilled"].push(`${result.body.data.orders.nodes[orderNode].name}`)
                
              }else{
                console.log("Fufilling "+result.body.data.orders.nodes[orderNode].name + "...")
                for(const node in result.body.data.orders.nodes[orderNode].fulfillmentOrders.nodes){
                  fulfillmentOrderId = result.body.data.orders.nodes[orderNode].fulfillmentOrders.nodes[node].id
                  //----------------------------------------------Starting to mutate fufillment data
                  try{
                    const mutResult =await client.client2.query({
                    data:{
                      "query": 
                        `mutation fulfillmentCreateV2($fulfillment: FulfillmentV2Input!) {
                          fulfillmentCreateV2(fulfillment: $fulfillment) {
                            fulfillment {
                              status
                              displayStatus
                              name
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

                  if(mutResult.body.data.fulfillmentCreateV2.fulfillment == "null"){
                    console.log(mutResult.body.data.fulfillmentCreateV2.userErrors);
                  }else{
                    console.log(mutResult.body.data.fulfillmentCreateV2.fulfillment)
                    
                  }


                  } //---------------------------------------------Error catching on mutation
                  catch(error){
                    console.log(error.stack);
                  }
                }

              }
           };
        }
      }



      // { this is what a sucessful fufillment looks like.
      //   "data": {
      //     "fulfillmentCreateV2": {
      //       "fulfillment": {
      //         "status": "SUCCESS",
      //         "displayStatus": "FULFILLED",
      //         "name": "#1005-F1",
      //         "order": {
      //           "name": "#1005"
      //         }
      //       },
      //       "userErrors": []
      //     }
      //   },
      //   "extensions": {
      //     "cost": {
      //       "requestedQueryCost": 11,
      //       "actualQueryCost": 11,
      //       "throttleStatus": {
      //         "maximumAvailable": 2000,
      //         "currentlyAvailable": 1989,
      //         "restoreRate": 100
      //       }
      //     }
      //   }
      // }



      // the entire for loop ends here and we can start to send results already.
      console.log("Orders " +alreadyFufilled+ "were already fufilled")
      console.log(resData);
      console.log("Orders "+failedOrders + "could not be queried");
      console.log("done")

    //-----------------------------------------------json result if everything goes well
    res.status(200).json({
        status:"success",
        
    });
    }

    //--------------------------------------------------last catch error
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