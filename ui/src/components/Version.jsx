/* ---------Verions---------------------------
Change certain settings on this page 
*set const version to the version you would like to let appear 
*set isLocal to true when testing on localhost, false when deploying on azure 
*
*/
import React from 'react'
export const Version = () => { 
    //change when version '=' to for change
    const version = '1.0.2';
    return ( 
        <div> 
           version {version}
        </div>
    );
}  
//true for local host testing and false for azure deploy 
export const isLocal = false;
