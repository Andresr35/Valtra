import axios from "axios"; 

//Versions Variable: change on version to configure for local or non local use
import { isLocal } from "../components/structure/Version";   
let Purl = "";  
//Web urls associated
const webPUrl = "https://backend-valtra-automation.azurewebsites.net/api/products"; 
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
