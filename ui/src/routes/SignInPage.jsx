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