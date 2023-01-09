/*------------------------------------------------------------- 
* File: SignInPage.jsx
* Author:TODO:Luis 
* Date: 08/31/2022
* Description: This is the code for a page that displays a 
* sign in page as long as the user is not authenticated. It 
* uses the useIsAuthenticed state from msal to tell. This page 
* is accessable to all users (those who are not authenticated) 
* and provides a sign in button to grant authentication. Being
* signed in to microsft does not necessarly mean you are 
* authenticated, but should sign you in automatically after 
* pressing sign in. Right now most of the sign in page besides 
* the sign in button and navbar and version number/ writing, 
* are default react app display, TODO: should change to a more 
* company unique display 
-------------------------------------------------------------*/
//React
import React from 'react';  
//Other Files
import '../assets/css/App.css';   
import logo from '../assets/images/logo.svg' 
import '../App.jsx';  
//Bootstrap   
import Navbar from "react-bootstrap/Navbar";  
//components
import { SignInButton } from '../components/SignInButton';
import { SignOutButton } from '../components/SignOutButton'; 
import { Version } from "../components/structure/Version";
//Azure auth
import { useIsAuthenticated } from "@azure/msal-react";

const SignInPage = (props) => {  
    const isAuthenticated = useIsAuthenticated();
        return (  

            <>
                <Navbar bg="primary" variant="dark">  
                    <a style={{marginLeft: '.7rem', marginRight: '.5rem'}}
                    className="navbar-brand" href="/">Welome to Valtra Automation!</a>   
                    {isAuthenticated ? <SignOutButton /> : <SignInButton />}    
                </Navbar> 

                <div className='App'>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" width={450} height={450} />  
                        <p>Please Sign in</p> 
                        <p></p>
                        <Version/>
                    </header>
                </div> 
            </> 
        ); 
      }  
    
    export default SignInPage; 