import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/NavBar' 
//TODO put actual documentation
//Holds the documentation for the website itself such as how to use it 
//and holds documentation for other relevent apps such as infor macros
const Documentation = () => { 
  return ( 
    <div>
      <NavBar/> 
      <Container>
        <p> Welcome to Documentation</p> 
      </Container>
    </div>
  )
}

export default Documentation