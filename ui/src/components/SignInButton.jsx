import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authentication/authConfig";
import Button from "react-bootstrap/Button";

function handleLogin(e,instance) {
  console.log(e)
  instance.loginPopup(loginRequest).catch((e) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  return (
    <div>
      <Button
        variant="secondary"
        className="ml-auto"
        onClick={(e) => handleLogin(e,instance)}
      >
        Sign in
      </Button>


    </div>
  );
};
