/*------------------------------------------------------------- 
* File: DocumentationRestricted.jsx 
* Author: TODO:Luis
* Date: 8/31/2022  
* Description: DocumentationRestricted is similar to 
* Documenation.jsx in that it contains documentation for users
* as well as functionallity to allow downlaods of documenation, 
* however this route allows access to anyone, not just signed 
* in users. For now it functions as a way to verify 
* authentication functionality, but can serve as a way to 
* distribute less sensitive documentation. Ex: Someone using 
* infor Invoice app, opens need help button and can get 
* redicted here without requiring any sign in 
-------------------------------------------------------------*/
import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/structure/NavBar'
//TODO: put actual documentation
//documentation for the website itself such as how to use it 
//and holds documentation for other relevent apps such as infor macros 
const DocumentationRestricted = () => { 
  return ( 
    <div>
      <NavBar/> 
      <Container>
      <h1 style={{textAlign: "center", fontSize: '40px'}}>Welcome to Documentation</h1> 
      <p style={{ textAlign: "center" }}>Scroll to find your Application</p> 
      <p style={{textAlign: "center"}}>Sign in for more documentation</p>
      </Container>
    </div>
  )
}

export default DocumentationRestricted