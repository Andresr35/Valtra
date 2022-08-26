/**
 * This should update all the shopify products and put them in our backend
 */

var CronJob = require("cron").CronJob;
const client = require("../utils/shopify");
const db = require("./index");
const { BlobServiceClient } = require("@azure/storage-blob");
const container = require("../utils/index");
const https = require("https");
const fs = require("fs");
// const fetch = require('node-fetch');
const fetch = require("electron-fetch").default;
const containerClient = container.getContainer();
const multer = require("multer");
var MulterAzureStorage = require("multer-azure-storage");
const streamToBlob = require("stream-to-blob");
var getFileName = function (file) {
  return file.originalname;
  // or return file.name;
};
const upload = multer({
  storage: new MulterAzureStorage({
    //TODO: add this connection string to env variables
    azureStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    containerName: "fireball-images",
    containerSecurity: "blob",
    fileName: getFileName,
  }),
});

async function createBlobFromLocalPath(
  containerClient,
  blobName,
  localFileWithPath,
  uploadOptions
) {
  // create blob client from container client
  const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

  // upload file to blob storage
  await blockBlobClient.uploadFile(localFileWithPath, uploadOptions);
  console.log(`${blobName} succeeded`);
}

var job = new CronJob(
  " */1 * * * *", // 10:30 on Monday every day

  /**
   * get shopify details and do it without running out of tokens->
   * upload image to azure container->
   * grab url from container from recently uploaded image->
   * enter shopify info + image url into database
   * finish
   *
   * @return  {None}
   */
  async function () {
    // * means basically every... https://crontab.guru/#30_*_*_*_1

    try {
      //---------------------------------QUERY first 10 products                           TODO: figure out how to get all data wihtout running out of tokens
      const result = await client.client2.query({
        data: `{
            products(first: 10) {
              nodes {
                id
                title
                description
                onlineStoreUrl
                featuredImage {
                  id
                  url
                }
                variants(first: 10) {
                  nodes {
                    id
                    displayName
                    inventoryQuantity
                    price
                    sku
                    title
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      id
                      url
                    }
                  }
                }
                options(first: 10) {
                  name
                  values
                }
                media(first: 10) {
                  nodes {
                    preview {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          
          `,
      });
      console.log(result.body.extensions);

      //---------------INSERT into database and container
      for (const product in result.body.data.products.nodes) {
        //products.nodes are results from shopify
        //TODO: stream to azure,,,get url,,,,give url to db
        console.log(result.body.data.products.nodes[product]);
        const fetchRes = await fetch(
          "https://storageaccount4valtra.blob.core.windows.net/fireball-images/HAAS%20Grades.png"
        );
        const dest = fs.createWriteStream("./image.png");
        await fetchRes.body.pipe(dest);

        const uploadOptions = {
          blobHTTPHeaders: {
            blobContentType: "image",
          },
          // indexed for searching
          tags: {
            productID: result.body.data.products.nodes[product].id,
            imageType: "Featured",
            createdBy: "Andres",
            createdWith: `StorageSnippetsForDocs`,
            createdOn: new Date().toDateString(),
          },
        };

        try {
          const blobRes = await createBlobFromLocalPath(
            containerClient,
            "test.png",
            "./image.png",
            uploadOptions
          );
          console.log(blobRes);
        } catch (error) {
          console.log(error);
        }

        // db.query(
        //   //if product exists update, if not insert
        //   `DO
        //       $do$
        //         BEGIN
        //             IF (EXISTS(SELECT id FROM products WHERE id ='${result.body.data.products.nodes[product].id}')) THEN
        //                 UPDATE products SET description = '${result.body.data.products.nodes[product].description}',
        //                                     title = '${result.body.data.products.nodes[product].title}'
        //                                 WHERE id ='${result.body.data.products.nodes[product].id}';
        //             ELSE
        //                 INSERT INTO products (id,description,title) VALUES ('${result.body.data.products.nodes[product].id}',
        //                                                                     '${result.body.data.products.nodes[product].description}',
        //                                                                     '${result.body.data.products.nodes[product].title}');
        //             END IF;
        //         END
        //       $do$`,
        //   (err, queryResult) => {
        //     //query callback function
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       console.log("\t Here are the query results:\n");
        //       console.log(queryResult);
        //     }
        //   }
        // );
      }
    } catch (error) {
      console.log(error);
    }
  },
  null,
  true,
  "America/Los_Angeles"
);

module.exports = { job };
