var express = require("express");
var router = express.Router();
const morgan = require("morgan");
const client = require("../../utils/shopify");
router.use(express.json());

/**
 * gets 50 orders from shopify
 *
 * @param   {path}  /orders  /api/shopify/orders
 */
router.get("/orders", (req, res) => {
  console.log("got data from shopify");
  client.client
    .get({ path: "/orders" })
    .then((result) => {
      res.status(200).json({
        status: 200,
        result: result.body.orders,
      });
    })
    .catch((error) => {
      res.json({
        status: error.stack,
      });
    });
});

router.get("/checkout/:token", async (req, res, next) => {
  try {
    const result = await client.client.get({
      path: `/checkouts/${req.params.token}`,
    });
    console.log(result.body);
  } catch (err) {
    return next(err);
  }
});

/**
 * gets the fulfillments from orders and fufills tehm
 *
 * @param   {route}  /fulfill  /api/shopify/fulfill
 *
 */
router.put("/fulfill", async (req, res) => {
  // console.log(req.body.data[0].Name);
  // console.log(req.body.data[0].Tracking);
  //start getting data and fulfilment numbers
  try {
    //------------------------------------------these will be the variables that change depending on what order we're on
    console.log("Running....");
    if (!req.body.data) {
      console.log("No JSON received");
      res.status(404).json({
        status: "null",
        message: "no JSON recieved",
      });
    } else {
      var obj = `[]`;
      const resData = JSON.parse(obj);
      for (const orderObject in req.body.data) {
        const name = req.body.data[orderObject].Name,
          shippingCompany = "fedex",
          trackingNumber = req.body.data[orderObject].Tracking;
        var fulfillmentOrderId = "";
        const result = await client.client2.query({
          data: `query getFulfillmentOrderbyName{
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
        if (!result.body.data.orders.nodes.length) {
          resData.push({
            name: `${req.body.data[orderObject].Name}`,
            Status: "FAILED",
          });
        } else {
          //----------------------------------------------getting the fufillment order id
          for (const orderNode in result.body.data.orders.nodes) {
            //this just gets the name
            if (
              result.body.data.orders.nodes[orderNode]
                .displayFulfillmentStatus == "FULFILLED"
            ) {
              resData.push({
                name: `${result.body.data.orders.nodes[orderNode].name}`,
                Status: "CLOSED",
              });
            } else {
              console.log(
                "Fufilling " +
                  result.body.data.orders.nodes[orderNode].name +
                  "..."
              );
              for (const node in result.body.data.orders.nodes[orderNode]
                .fulfillmentOrders.nodes) {
                fulfillmentOrderId =
                  result.body.data.orders.nodes[orderNode].fulfillmentOrders
                    .nodes[node].id;
                //----------------------------------------------Starting to mutate fufillment data
                try {
                  const mutResult = await client.client2.query({
                    data: {
                      query: `mutation fulfillmentCreateV2($fulfillment: FulfillmentV2Input!) {
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
                      variables: {
                        fulfillment: {
                          lineItemsByFulfillmentOrder: [
                            {
                              fulfillmentOrderId: `${fulfillmentOrderId}`,
                            },
                          ],
                          notifyCustomer: true,
                          trackingInfo: {
                            company: `${shippingCompany}`,
                            number: `${trackingNumber}`,
                          },
                        },
                      },
                    },
                  });

                  if (
                    mutResult.body.data.fulfillmentCreateV2.fulfillment ==
                    "null"
                  ) {
                    console.log(
                      mutResult.body.data.fulfillmentCreateV2.userErrors
                    );
                  } else {
                    resData.push({
                      name: `${mutResult.body.data.fulfillmentCreateV2.fulfillment.order.name}`,
                      Status: `${mutResult.body.data.fulfillmentCreateV2.fulfillment.displayStatus}`,
                    });
                  }
                } catch (error) {
                  //---------------------------------------------Error catching on mutation
                  console.log(error.stack);
                }
              }
            }
          }
        }
      }

      // the entire for loop ends here and we can start to send results already.
      obj = JSON.stringify(resData);
      //-----------------------------------------------json result if everything goes well
      console.log("done");
      res.status(200).json({
        status: "success",
        orders: resData,
      });
    }

    //--------------------------------------------------last catch error
  } catch (err) {
    console.log("error at query");
    console.log(err.stack);
    res.status(404).json("something broke");
  }
});

/**
 * grabs one order using REST api
 *
 * @param   {route}  /orders/:id  api/shopify/orders/:id
 */
router.get("/orders/:id", (req, res) => {
  client.client
    .get({ path: `/orders/${req.params.id}` })
    .then((result) => {
      res.json({
        status: "good job",
        result: result.body.order,
      });
    })
    .catch((error) => {
      res.json({
        status: error.response,
      });
    });
});

/**
 * lets grab products, along with any product variants if any, their description, and images
 *
 * @param   {route}  /products  /api/shopify/products
 *
 * @return  {json}             TODO
 */
router.get("/products", async (req, res) => {
  try {
    result = await client.client2.query({
      data: `{
        products(first :20) {
          nodes {
            id
            title
            handle
            description
            descriptionHtml
            featuredImage {
              id
              altText
              url 
            }
            images(first:10){
              nodes{
                id
                altText
                url
              }
            }
            media(first:2){
              nodes{
                preview{
                  image{
                    id
                    altText
                    url
                  }
                  status
                }
              }
            }
            onlineStoreUrl
            options{
              id
              name
              values
            }
            totalInventory
            variants(first:10){
              nodes{
                id
                displayName
                image{
                  id
                  altText
                  url
                }
              }
            }
        }
      }
      }`,
    });

    res.json(result);
  } catch (error) {
    res.json(error.stack);
  }
}); 

router.get('/products/:id', async(req, res) => { 
  try {
    const results = await client.client2.query({ 
    	data: `{
        product(id: "gid://shopify/Product/${req.params.id}") {
          title
          description
          onlineStoreUrl 
          featuredImage 
          variants(first: 10){
            id 
            image 
            
          }
      }
    }`, 
  }); 
  res.json(results); 
  } catch (error) {
    res.json(error.stack);
  } 
});

module.exports = router;
