/*------------------------------------------------------------- 
* File: SignOutButton.jsx
* Author:TODO:Luis 
* Date: 08/31/2022
* Description: Exports a rendered button. The button much like 
* the sign in button also issue a pop up when clicked but this 
* time prompts the user to select an account to sign out from 
* this then signs a user out. Uses microsft documentation. 
* Uses microsoft. azure recources to do so  
-------------------------------------------------------------*/
import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    return ( 
        <Button variant="light" className="ml-auto" onClick={() => handleLogout(instance)}>Sign out</Button>
    );
} 