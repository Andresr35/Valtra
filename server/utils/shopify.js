// where i will set up api
require('dotenv').config()

const { default: Shopify } = require("@shopify/shopify-api");
const { Context } = require("@shopify/shopify-api/dist/context");

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST_NAME,API_VERSION } = process.env;

Context.initialize({API_KEY,API_SECRET_KEY,SCOPES,SHOP,HOST_NAME,API_VERSION});

const client = new Shopify.Clients.Rest(SHOP,process.env.API_ACCESS_TOKEN);
const client2 = new Shopify.Clients.Graphql(SHOP,process.env.API_ACCESS_TOKEN);

    
module.exports = {client,client2}
// console.log(client.get({path:'orders',
// },).then(res => console.log(res.body)))