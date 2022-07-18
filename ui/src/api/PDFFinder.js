import axios from "axios"; 

//import { isLocal } from "../components/Version"; 
let isLocal = true;  
let PDFurl = "";  
//Web urls associated
const webPDFUrl = "https://valtra-automation.azurewebsites.net/api/pdf"; 
const localPDFUrl = "http://localhost:3006/api/pdf"; 
//Algorithm that changes the urls 
if (isLocal === false) { 
  PDFurl = webPDFUrl; 
} else { 
  PDFurl = localPDFUrl;
}

export default axios.create({
    baseURL:PDFurl

});
