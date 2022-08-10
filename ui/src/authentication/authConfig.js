import {isLocal } from '../components/structure/Version'; 
//change const var local to chage from localhost deployment and the azure site deployment
let url = "";  
//Web urls associated
const webUrl = "https://valtra-automation.azurewebsites.net"; 
const localUrl = "http://localhost:3005"; 
//Algorithm that changes the urls 
if (isLocal === false) { 
  url = webUrl; 
} else { 
  url = localUrl;
} 
// TODO: make this a secret instead of an app enviroment type of thing... client id maybe

export const msalConfig = {
  auth: {
    clientId: "b3efa5e9-61b3-43ea-84f7-dfc321dcae68", 
    authority: "https://login.microsoftonline.com/stronghandtools.com/", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: url 
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use. can i add more endpints here?
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com",
   
};