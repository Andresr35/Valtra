/* ---------Verions---------------------------
Change certain settings on this page 
*set const version to the version you would like to let appear 
*set isLocal to true when testing on localhost, false when deploying on azure 
*
*/
import React from "react";
export const Version = () => {
  //change when version '=' to for change
  const version = "1.1.2";
  return <>Version {version}</>;
};
//true for local host testing and false for azure deploy
export const isLocal = false;

//turn true to signify operational and up to production
export const isproduction = true;
