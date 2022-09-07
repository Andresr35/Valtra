/*------------------------------------------------------------- 
* File: Updates.jsx
* Author:TODO:Luis 
* Date: 08/31/2022
* Description: Updates.jsx is a page accessable on the navbar 
* for signed in users that displays updates and the version
* number associated with them to have a hsitory for 
* developers, but as a tool to users to indiacte to them 
* new features and bug fixes   
-------------------------------------------------------------*/ 
import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/structure/NavBar' 
import {Version} from '../components/structure/Version'

const Updates = () => { 
  return ( 
    <div>
      <NavBar/> 
      <Container>
        <p>Updates 1.0.0 - 1.0.14 development phases with 1.0.14 being the first functional version</p> 
        <p>First official update: TBD</p> 
        <p>Current: <Version/></p>  
      </Container>
    </div> 
    
  )
}

export default Updates