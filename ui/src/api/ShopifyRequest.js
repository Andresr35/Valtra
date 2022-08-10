import axios from "axios";
import { isLocal } from "../components/structure/Version";
import { useMsal } from "@azure/msal-react";
const graph = require('../authentication/graph');
// const { accounts } = useMsal(); 
// let name = accounts[0] && accounts[0].name; 

let Shopurl = "";
//Web urls associated
const webBUrl =
  "https://backend-valtra-automation.azurewebsites.net/api/shopify";
const localBUrl = "http://localhost:3006/api/shopify";
//Algorithm that changes the urls
if (isLocal === false) {
  Shopurl = webBUrl;
} else {
  Shopurl = localBUrl;
}
/**
 * Allows you to do requests to backend url
 *
 * @return  {AxiosInstance}  object to do http requests like .get()
 */
export default axios.create({
  baseURL: Shopurl,
  headers:{'Authorization':"key"}
});
