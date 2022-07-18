import axios from "axios"; 

import { isLocal } from "../components/Version"; 
let Purl = "";  
//Web urls associated
const webPUrl = "https://valtra-automation.azurewebsites.net/api/products"; 
const localPUrl = "http://localhost:3006/api/products"; 
//Algorithm that changes the urls 
if (isLocal === false) { 
  Purl = webPUrl; 
} else { 
  Purl = localPUrl;
}

export default axios.create({
    baseURL: Purl
});
