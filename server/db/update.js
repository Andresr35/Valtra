var CronJob = require("cron").CronJob;
const client = require("../utils/shopify");
const db = require("./index")

var job = new CronJob(
  " */2 * * * *",// 10:30 on Monday every day
  async function () {
    try {
            // * means basically every... https://crontab.guru/#30_*_*_*_1
    console.log("You will see this message every minute");
    const result = await client.client2.query({
      data: `{
            products(first: 10) {
              nodes {
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
    console.log(result.body.data.products.nodes)
    console.log(result.body.extensions)
    // db.query(`UPDATE products SET id = $2, description = '' WHERE id = $1 returning*` ,[req.params.id],(err,res) =>{
    //     if (err){
    //       console.log(err.stack);
    //     }else{
    //       res.status(200).json({
    //       status:"success"
    //       })
    //     }
    //   })

} catch (error) {
        console.log(error)
    }

  },
  null,
  true,
  "America/Los_Angeles"
);

module.exports = { job };
