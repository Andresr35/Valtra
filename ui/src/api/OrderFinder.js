import axios from "axios"; 

import { isLocal } from "../components/Version";    
let Shopurl = "";  
//Web urls associated
const webBUrl = "https://backend-valtra-automation.azurewebsites.net/api/shopify"; 
const localBUrl = "http://localhost:3006/api/shopify"; 
//Algorithm that changes the urls 
if (isLocal === false) { 
  Shopurl = webBUrl; 
} else { 
  Shopurl = localBUrl;
}

export default axios.create({
    baseURL:Shopurl
});
