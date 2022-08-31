/*-------------------------------------------------------------  
* File: SignOut.jsx
* Author:TODO:Luis 
* Date: 08/31/2022
* Description: The Signout.jsx produces a sign out page. Mainly 
* to indicate to users who were previously using the website or 
* trying to go on onto restricted (as in need authentication) 
* that they need to login/ login agin (to regain acess token) 
* This page should provide a button to take users to sign in page, 
* or take them to an unrestricted page. TODO:Major ui upadte, 
* this page is AGREGGIOUSLY unkind to the eye    
-------------------------------------------------------------*/
//React
import React from "react";
import { useNavigate } from "react-router-dom";
//Other Files
import "../assets/css/App.css";
// import logo from '../assets/images/logo.svg'
import valtra_logo from "../assets/images/valtra_logo.svg";
import "../App.jsx";
//Bootstrap
import Navbar from "react-bootstrap/Navbar";

//components;
import { Version } from "../components/structure/Version";

//Function to navigate users to sign in page
const SignOutPage = (props) => {
  let navigate = useNavigate();
  const redirect = () => {
    navigate("/");
  };
  const redirectUn = () => {
    navigate("/Documentation");
  };
  return (
    <> 
      <Navbar bg="primary" variant="dark">
        <a
          style={{ marginLeft: ".7rem", marginRight: ".5rem" }}
          className="navbar-brand"
          href="/"
        >
          Welome to Valtra Automation!
        </a>
      </Navbar>
      <div className="App">
        <header className="App-header">
          <img
            src={valtra_logo}
            className="App-logo"
            alt="logo"
            width={450}
            height={450}
          />
          <p>You are signed Out</p>
          <p>Please go back to Sign in page to gain access</p>
          <p></p>
          <a href="/#">
            <button
              style={{ background: "#0693E3" }}
              className="px-4"
              onClick={() => redirect()}
            >
              Go to Login page
            </button>
            <button className="px-4" onClick={() => redirectUn()}>
              Proceed to Unresticted pages
            </button>
          </a>
          <Version />
        </header>
      </div>
    </>
  );
};

export default SignOutPage;
