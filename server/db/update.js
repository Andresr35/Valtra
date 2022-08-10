// var CronJob = require("cron").CronJob;
// const client = require("../utils/shopify");
// const db = require("./index");
// const { BlobServiceClient } = require("@azure/storage-blob");
// const container = require("./index");

// const containerClient = container.getClient();

// var job = new CronJob(
//   " */1 * * * *", // 10:30 on Monday every day
//   async function () {
//     try {
//       // * means basically every... https://crontab.guru/#30_*_*_*_1
//       console.log("You will see this message every minute");

//       //-----------------this is where we get data from shopify TODO: figure out how to get all data wihtout running out of tokens
//       const result = await client.client2.query({
//         data: `{
//             products(first: 10) {
//               nodes {
//                 id
//                 title
//                 description
//                 onlineStoreUrl
//                 featuredImage {
//                   id
//                   url
//                 }
//                 variants(first: 10) {
//                   nodes {
//                     id
//                     displayName
//                     inventoryQuantity
//                     price
//                     sku
//                     title
//                     selectedOptions {
//                       name
//                       value
//                     }
//                     image {
//                       id
//                       url
//                     }
//                   }
//                 }
//                 options(first: 10) {
//                   name
//                   values
//                 }
//                 media(first: 10) {
//                   nodes {
//                     preview {
//                       image {
//                         url
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
          
//           `,
//       });

//       //   console.log(result.body.data.products.nodes);
//       console.log(result.body.extensions);

//       //------------------------------------------------------------- Get a block blob client and download
//       const blockBlobClient = containerClient.getBlockBlobClient("test.png");

//       const downloadStream = got.stream(
//         "https://cdn.shopify.com/s/files/1/0581/8459/7641/products/index.png?v=1658532454"
//       );

//       const uploadBlobResponse = await blockBlobClient.uploadStream(
//         downloadStream
//       );

//       //---------------This is where we start doing database stuff.. putting in backup
//       for (const product in result.body.data.products.nodes) {
//         //TODO: stream to azure,,,get url,,,,give url to db
//         const blockBlobClient = containerClient.getBlockBlobClient("test.png");

//         const downloadStream = got.stream(
//           "https://cdn.shopify.com/s/files/1/0581/8459/7641/products/index.png?v=1658532454"
//         );
  
//         const uploadBlobResponse = await blockBlobClient.uploadStream(
//           downloadStream
//         );


//         console.log(result.body.data.products.nodes[product]);
//         db.query(
//           `DO
//               $do$
//                 BEGIN
//                     IF (EXISTS(SELECT id FROM products WHERE id ='${result.body.data.products.nodes[product].id}')) THEN
//                         UPDATE products SET description = '${result.body.data.products.nodes[product].description}',
//                                             title = '${result.body.data.products.nodes[product].title}'
//                                         WHERE id ='${result.body.data.products.nodes[product].id}';
//                     ELSE
//                         INSERT INTO products (id,description,title) VALUES ('${result.body.data.products.nodes[product].id}',
//                                                                             '${result.body.data.products.nodes[product].description}',
//                                                                             '${result.body.data.products.nodes[product].title}');
//                     END IF;
//                 END
//               $do$`,
//           //   "INSERT INTO products (id,description) VALUES (2,'testtt') returning *",
//           //   [result.body.data.products.nodes[product].id],
//           (err, queryResult) => {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log("\t Here are the query results:\n");
//               console.log(queryResult);
//             }
//           }
//         );
//         console.log("this ran?");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   null,
//   true,
//   "America/Los_Angeles"
// );

// module.exports = { job };
