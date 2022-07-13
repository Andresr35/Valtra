export const msalConfig = {
  auth: {
    clientId: "b3efa5e9-61b3-43ea-84f7-dfc321dcae68", //b3efa5e9-61b3-43ea-84f7-dfc321dcae68, e012f4dd-5515-4772-a765-f6a382b2f97f
    authority: "https://login.microsoftonline.com/stronghandtools.com/", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: /*"https://valtra-automation.azurewebsites.net" */ "http://localhost:3005" 
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

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com"
};