var express = require("express");
var router = express.Router();
const client = require("../../utils/shopify");
const multer = require("multer");
const path = require("path");
const db = require("../../db");
var MulterAzureStorage = require("multer-azure-storage");
require("dotenv").config();

/**
 * Just returning a multer's files original name
 *
 * @param   {imageFile}  file  
 *
 * @return  {str}        original file name
 */
var getFileName = function (file) {
  return file.originalname;
};

/**
 * Middleware for uploading imageForms to Azure from frontend.
 * Requires AZURE_STORAGE_CONNECTION_STRING in env.
 *
 * Containes configuration for blob.
 *
 * @return  {None}  none
 */
const upload = multer({
  storage: new MulterAzureStorage({
    //TODO: add this connection string to env variables
    azureStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    containerName: "fireball-images",
    containerSecurity: "blob",
    fileName: getFileName,
  }),
});

/**
 * Gets 50 orders from shopify
 * Is used for "Orders" page.
 *
 * @param   {path}  /orders  /api/shopify/orders
 */
router.get("/orders", async (req, res) => {
  try {
    const result = await client.restClient.get({ path: "/orders" });
    res.status(200).json({
      status: 200,
      result: result.body.orders,
    });
  } catch (error) {
    res.json({
      status: error.stack,
    });
  }
});

/**
 * Gets the fulfillments ID by order name,
 * Loops through all orders and fulfills
 * 
 * Res sends back object with status of fulfillment orders
 *
 * @param   {route}  /fulfill  /api/shopify/fulfill
 *
 */
router.put("/fulfill", async (req, res) => {
  try {
    // Handler in case there is nothing in res.body.data
    if (!req.body.data) {
      res.status(404).json({
        status: "Null",
        message: "No JSON recieved",
      });
    } else {
      var obj = `[]`;
      const resData = JSON.parse(obj);
      // Looping through the orders to fulfill
      for (const orderObject in req.body.data) {
        const name = req.body.data[orderObject].Name,
          shippingCompany = "fedex",
          trackingNumber = req.body.data[orderObject].Tracking;
        var fulfillmentOrderId = "";
        // Grabbing fulfillment ID's based on the Order Name
        const result = await client.graphClient.query({
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
        // Checking to see if the order name could be queried
        if (!result.body.data.orders.nodes.length) {
          resData.push({
            name: `${req.body.data[orderObject].Name}`,
            Status: "FAILED",
          });
        } else {
          // Looping through orders given back
          for (const orderNode in result.body.data.orders.nodes) {
            // Handling orders that have already been fulfilled
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
              // Looping through fulfillment ID's
              for (const node in result.body.data.orders.nodes[orderNode]
                .fulfillmentOrders.nodes) {
                fulfillmentOrderId =
                  result.body.data.orders.nodes[orderNode].fulfillmentOrders
                    .nodes[node].id;
                try {
                  // Starting to fulfill orders
                  const mutResult = await client.graphClient.query({
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
                  // Handling any mutation erros
                  if (
                    mutResult.body.data.fulfillmentCreateV2.fulfillment ==
                    "null"
                  ) {
                    console.log(
                      mutResult.body.data.fulfillmentCreateV2.userErrors
                    );
                  } else {
                    // Saving the status of the fulfillment
                    resData.push({
                      name: `${mutResult.body.data.fulfillmentCreateV2.fulfillment.order.name}`,
                      Status: `${mutResult.body.data.fulfillmentCreateV2.fulfillment.displayStatus}`,
                    });
                  }
                } catch (error) {
                  // Error handling on mutation
                  console.log(error.stack);
                }
              }
            }
          }
        }
      }

      // Starting to send results back
      obj = JSON.stringify(resData);
      // JSON result if everything goes well
      console.log("Done");
      res.status(200).json({
        status: "success",
        orders: resData,
      });
    }

    // Final error handling for entire route
  } catch (err) {
    console.log(" Error at query for fulfillment ID");
    console.log(err.stack);
    res.status(404).json({
      message:"Something broke on /fulfill route",
      error: err.stack
    });
  }
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
    result = await client.graphClient.query({
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

/**
 * gets the id and sends images for the variants as well as a little bit of the variants' info
 *
 * @param   {route}  /products/:id  [/products/:id description]
 */
router.get("/products/:id", async (req, res) => {
  try {
    const results = await client.graphClient.query({
      data: `{
        product(id: "gid://shopify/Product/${req.params.id}") {
          title
          description
          featuredImage{
            url
          }
          variants(first: 10){
            nodes {
              price
              sku
              title 
              id
              selectedOptions{
                name
                value
              }
              image {
                url
              }
            }
          }
          options(first:10){
            name
            values
          }
          media(first:10){
            nodes{
              preview{
                image{
                  url
                }
              }
            }
          }
        }
      }`,
    });

    res.json(results);
  } catch (error) {
    res.json(error.stack);
  }
});

/**
 * Mutating a product image with another current image hosted in shopify
 *
 * @param   {route}  /products/:id  [/products/:id description]
 */
router.post("/products/:id", async (req, res) => {
  try {
    const result = await client.graphClient.query({
      data: {
        query: `mutation productImageUpdate($image: ImageInput!, $productId: ID!) {
          productImageUpdate(image: $image, productId: $productId) {
            image { 
              id 
              url
            }
            userErrors {
              field
              message
            }
          }
        }`,
        variables: {
          productId: `gid://shopify/Product/${req.params.id}`,
          image: {
            id: "gid://shopify/ProductImage/6901870067849",
            src: `${req.body.url}`,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    console.log(req);
    res.json(error.stack);
  }
});

/**
 * Updating the price of a shopify product. 
 * 
 * Requies a new price and ID in req.body
 *
 * @param   {rout}  /productUpdatePrice  [/productUpdatePrice description]
 */
router.put("/productUpdatePrice", async (req, res) => {
  try {
    const data = await client.graphClient.query({
      data: {
        query: `mutation updateProductVariantMetafields($input: ProductVariantInput!) {
          productVariantUpdate(input: $input) {
            productVariant {
              id
               price
            }
            userErrors {
              message
              field
            }
          }
        }`,
        variables: {
          input: {
            id: `${req.body.data[1]}`,
            price: `${req.body.data[0]}`,
          },
        },
      },
    });
    res.status(200).json({
      message: "Sucess",
      result:data
    })
  } catch (error) {
    res.json(error.stack)
  }
});

/**
 * Update Product SKU
 * 
 * Requires ID and new SKU in req.body
 *
 * @param   {route}  /productUpdateSku  [/productUpdateSku description]
 *
 */
router.put("/productUpdateSku", async (req, res) => {
  try {
    console.log(req.body);
    const data = await client.graphClient.query({
      data: {
        query: `mutation updateProductVariantMetafields($input: ProductVariantInput!) {
          productVariantUpdate(input: $input) {
            productVariant {
              id
               sku
            }
            userErrors {
              message
              field
            }
          }
        }`,
        variables: {
          input: {
            id: `${req.body.data[1]}`,
            sku: `${req.body.data[0]}`,
          },
        },
      },
    });
    res.status(200).json({
      message:"Sucess",
      result:data
    })
  } catch (error) {
    res.json(error.stack)
  }

});

/**
 * Updating the featured image of a shopify product.
 * 
 * requires imagefile in body
 * 
 * uploads to azure container.
 * 
 * NOTE: No longer in use
 *
 * @param   {[type]}  /productVariant  [/productVariant description]
 * @param   {middleware}  upload           saves image to azure
 * @param   {FormData}  image            formData of image
 *
 */
router.put("/productVariant", upload.single("image"), async (req, res) => {
  if (req.file) {
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;
    console.log(req.file.url);
    res.status(200).json({
      status: "success",
    });
  } else {
    console.log("no file");
  }
});

module.exports = router;
