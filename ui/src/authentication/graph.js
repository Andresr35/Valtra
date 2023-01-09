/*------------------------------------------------------------- 
____________________//#TODO: Document LUIS
* File: graph.js 
* Date: 8/31/2022  
* Description: 
-------------------------------------------------------------*/
import { graphConfig } from "./authConfig";
/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user 
 * @param accessToken
 */
export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}