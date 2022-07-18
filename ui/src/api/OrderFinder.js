import axios from "axios"; 

//import { isLocal } from "../components/Version"; 
let isLocal = true;   
let Burl = "";  
//Web urls associated
const webBUrl = "https://valtra-automation.azurewebsites.net/api/shopify"; 
const localBUrl = "http://localhost:3006/api/shopify"; 
//Algorithm that changes the urls 
if (isLocal === false) { 
  Burl = webBUrl; 
} else { 
  Burl = localBUrl;
}

export default axios.create({
    baseURL:Burl
});
