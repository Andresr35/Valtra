
export const callApiWithToken = async(accessToken, apiEndpoint,method,body) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    const options = {
        method: method,
        headers: headers,
        body:body
    };

    return fetch(apiEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}