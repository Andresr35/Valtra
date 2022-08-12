import {isLocal } from '../components/structure/Version'; 
//change const var local to chage from localhost deployment and the azure site deployment
let url = "";  
//Web urls associated
const webUrl = "https://valtraautomation.azurewebsites.net"; //https://valtra-automation.azurewebsites.net/
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
    clientId: "508865a0-9a82-487c-a2cb-314fb88ff3b1", 
    authority: "https://login.microsoftonline.com/0abd75ee-31bd-4491-8c4c-7a1ff64b4f0f", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})0abd75ee-31bd-4491-8c4c-7a1ff64b4f0f,,https://login.microsoftonline.com/stronghandtools.com/
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
export const protectedResources = {
  graphMe: {
      endpoint: "https://graph.microsoft.com/v1.0/me",
      scopes: ["User.Read"],
  },
  apiHello: {
      endpoint: "http://localhost:3006/hello",
      scopes: ["api://f2be1c04-63b0-4f81-bc6d-3fe120ac6712/access_as_user"], // e.g. api://xxxxxx/access_as_user
  },
}