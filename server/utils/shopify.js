// Setting up both REST and GRAPHQL API's from Shopify
// to be used in the routes folder

require("dotenv").config();

const { default: Shopify } = require("@shopify/shopify-api");
const { Context } = require("@shopify/shopify-api/dist/context");

const {
  API_KEY,
  API_SECRET_KEY,
  SCOPES,
  SHOP,
  HOST_NAME,
  API_VERSION,
  API_ACCESS_TOKEN,
} = process.env;

Context.initialize({
  API_KEY,
  API_SECRET_KEY,
  SCOPES,
  SHOP,
  HOST_NAME,
  API_VERSION,
});

// Both API's are needed since they have different methods
const restClient = new Shopify.Clients.Rest(SHOP, API_ACCESS_TOKEN);
const graphClient = new Shopify.Clients.Graphql(SHOP, API_ACCESS_TOKEN);

module.exports = { restClient, graphClient };
