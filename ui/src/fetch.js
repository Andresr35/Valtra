/**
 * Helper function for sending HTTP requests to the backened with Azure Access tokens.
 */

export const callApiWithToken = async(accessToken, apiEndpoint,method,body) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);
    headers.append('Content-Type','application/json')
    const options = {
        method: method,
        headers: headers,
        body:JSON.stringify(body)
    };

    return fetch(apiEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}