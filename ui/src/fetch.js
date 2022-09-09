/**
 * Helper function for sending HTTP requests to the backened with Azure Access tokens.
 */

import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { AuthenticationResult } from "@azure/msal-browser";

export const callApiWithToken = async (
  accessToken,
  apiEndpoint,
  method,
  body, 
  isHeaders = false 
) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append("Authorization", bearer); 
  var options; 
  if (isHeaders) { 
    headers.append("Content-Type", "multipart/form-data") 
    options = {
      method: method,
      headers: headers,
      body: body,
    };
  } 
  else { 
    headers.append("Content-Type", "application/json"); 
    options = {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    };
  }

  return fetch(apiEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};






/**
 * Grab the current azure token based on your current login to use to send in headers
 *
 * @return  {Promise<AuthenticationResult>}  returns token
 */
export const aquireToken = async (
  account,
  inProgress,
  instance,
  protectedResources
) => {
  try {
    if (account && inProgress === "none") {
      return instance.acquireTokenSilent({
        scopes: protectedResources.apiHello.scopes,
        account: account,
      });
    }
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      if (account && inProgress === "none") {
        return instance.acquireTokenPopup({
          scopes: protectedResources.apiHello.scopes,
        });
      }
    }
    throw Error("Not able to authenitcate");
  }
};

