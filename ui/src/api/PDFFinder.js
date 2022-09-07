import axios from "axios"; 
//Versions Variable: change on version to configure for local or non local use 
import { isLocal } from "../components/Version";   
let PDFurl = "";  
//Web urls associated {cloud & local}
const webPDFUrl = "https://backend-valtra-automation.azurewebsites.net/api/pdf"; 
const localPDFUrl = "http://localhost:3006/api/pdf"; 
//"Algorithm" that changes the urls 
if (isLocal === false) { 
  PDFurl = webPDFUrl; 
} else { 
  PDFurl = localPDFUrl;
}

export default axios.create({

    baseURL:PDFurl


});
