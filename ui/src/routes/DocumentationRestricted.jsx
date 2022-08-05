import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/structure/NavBar'
//TODO put actual documentation
//Holds the documentation for the website itself such as how to use it 
//and holds documentation for other relevent apps such as infor macros 
// however this is a restricted version that does not reuire a sign in, 
// this is done to enable easy access from other documentation pageXOffset, so that 
// users of already distributed applications can view updated documentation
const DocumentationRestricted = () => { 
  return ( 
    <div>
      <NavBar/> 
      <Container>
        <p> Welcome to Documentation with restricted acess</p> 
      </Container>
    </div>
  )
}

export default DocumentationRestricted