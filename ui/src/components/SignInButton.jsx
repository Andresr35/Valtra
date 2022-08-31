/*------------------------------------------------------------- 
* File: SignInButton.jsx
* Author:TODO:Luis 
* Date: 08/31/2022
* Description: Uses authConfig and msal to create a login 
* request useing microsoft pop up attached to a button 
* displaying "Sign In". From microsft documentation mainly. Uses 
* microsoft. azure recources to do so.
-------------------------------------------------------------*/
import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authentication/authConfig";
import Button from "react-bootstrap/Button";
//Make login attempt
function handleLogin(instance) {
  instance.loginPopup(loginRequest).catch((e) => {
    console.error(e);
  });
}
//renders button
export const SignInButton = () => {
  const { instance } = useMsal();
  return (
    <div>
      <Button
        variant="secondary"
        className="ml-auto"
        onClick={() => handleLogin(instance)}>
        Sign in
      </Button>
    </div>
  );
};
