/* ---------Verions---------------------------
Change certain settings on this page 
*set const version to the version you would like to let appear 
*set isLocal to true when testing on localhost, false when deploying on azure 
*
*/
import React from 'react'
export const Version = () => { 
    //change when version '=' to for change
    const version = '1.0.9';
    return ( 
        <> 
           version {version}
        </>
    );
}  
//true for local host testing and false for azure deploy 
export const isLocal = false;

//changes automatically to port 
const port = process.env.PORT || 3005; 
let puerto = '';    
if (isLocal === true) {  
    puerto = 'http://localhost' + port; 
} else { 
    puerto = 'https://valtra-automation.azurewebsites.net'; 
} 

export const portFinder = puerto; 

