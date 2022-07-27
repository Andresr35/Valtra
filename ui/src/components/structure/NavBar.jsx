//react and otehr plugins
import React from 'react'
//bootstrap
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";   
import Nav from "react-bootstrap/Nav"; 
//Azure Auth 
import { useIsAuthenticated } from "@azure/msal-react";
//components
import { SignInButton } from "../SignInButton";
import { SignOutButton } from "../SignOutButton"; 
import { isproduction, Version } from "./Version"; 
import { useMsal } from "@azure/msal-react";  


const NavBar = () => { 
    const isAuthenticated = useIsAuthenticated(); 
    const { accounts } = useMsal(); 
    let name = accounts[0] && accounts[0].name;  
    if (name === 'Andres Ruiz') { 
        name = 'Bozo'; 
    } else if (name === 'Angel Arellano') { 
        name = 'Please wait: Downloading Free Ram ...'
    } 
    //Changes NAvBar brand to VatraAuto Dev or ValtraAuto
    let DevTitle = ""; 
    if (isproduction === true) { 
        DevTitle = "Valtra-Automation"; 
    } else { 
        DevTitle = "ValtraAuto DEV"; 
    }
  return (  
    <div>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">{DevTitle}</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/orders">Orders</Nav.Link>
                    <Nav.Link href="/fulfill">Fulfill Orders</Nav.Link>
                    <Nav.Link href="/products">Shopify Products </Nav.Link> 
                    <Nav.Link href="/downloads">Downloads</Nav.Link>
                    <Nav.Link href="/documentation">Documentation</Nav.Link>
                </Nav> 
                {isAuthenticated ? <SignOutButton /> : <SignInButton />} 
            </Container> 
        </Navbar>  
        <p className="card-title" style={{marginLeft: '.7rem'}}>Welcome {name}</p> 
        <p style={{marginLeft: '.7rem'}}><Version/></p> 
    </div>
  )
}
/*
<div>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
        <a className="navbar-brand" href="/">DEV</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"> 
                    <NavLink to='/' aria-current="page" className={({isActive})=>isActive ? 'nav-link active ' : 'nav-link'}>Home</NavLink>
                </li>
                <li className="nav-item"> 
                    <NavLink to='/orders' aria-current="page" className={({isActive})=>isActive ? 'nav-link active ' : 'nav-link'}>Orders</NavLink>
                </li>
                <li className="nav-item"> 
                    <NavLink to='/fulfill' aria-current="page" className={({isActive})=>isActive ? 'nav-link active ' : 'nav-link'}>Fulfill Orders</NavLink>
                </li>
            </ul>
        </div>
    </div>
</nav>
</div>*/

export default NavBar;
