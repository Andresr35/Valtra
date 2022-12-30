/*------------------------------------------------------------- 
* File: Versions.jsx 
* Author: TODO:Luis
* Date: 8/31/2022  
* Description: Verisions contains exported variables that are 
* utalized throughout the frontEnd. The act as hot swapple value
* holders to change what the ui displays. Versions is much 
* like a settings page. Please read the comments above each one 
* to see what kind of changes they make. MAKE SURE TO UPDATE 
* this especailly inbetween testing and actual deployments or 
* when switching from local and cloud use 
-------------------------------------------------------------*/
import React from "react"; 
/* Version changes the displayed version number, please update 
this inbetween deployments. The first number in version string 
represnets major changes, like ones that change the web app 
significanlty (possible learning curves for veteran users), the 
second represents intermediate changes, perhaps such as a new 
feature addition, and the third represnts small changes (like a 
small bug fix or minor feature update) However these numbers 
are really up to the developers and to show if a deployemnt was 
successful/ is active */  
export const Version = () => {
  //change when version '=' to for change
  const version = "1.1.3";
  return <>Version {version}</>;
}; 
//true for local host testing and false for azure deploy 
//Will change redirect paths
export const isLocal = true; 
//turn true to signify operational and up to production 
//Changes certain displays
export const isproduction = true;
