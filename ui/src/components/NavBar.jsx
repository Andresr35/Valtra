//react and otehr plugins
import React from 'react'
//bootstrap
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";   
import Nav from "react-bootstrap/Nav"; 
//Azure Auth 
import { useIsAuthenticated } from "@azure/msal-react";
//components
import { SignInButton } from "../components/SignInButton";
import { SignOutButton } from "../components/SignOutButton"; 
import { Version } from "./Version"; 

const NavBar = () => { 
    const isAuthenticated = useIsAuthenticated();
  return (  
    <div>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">ValtraAuto DEV</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/orders">Orders</Nav.Link>
                    <Nav.Link href="/fulfill">Fulfill Orders</Nav.Link>
                </Nav> 
                {isAuthenticated ? <SignOutButton /> : <SignInButton />} 
            </Container> 
        </Navbar> 
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

export default NavBar


    