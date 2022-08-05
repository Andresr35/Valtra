import React from 'react'
import Container from 'react-bootstrap/esm/Container'
<<<<<<< HEAD
import NavBar from '../components/structure/NavBar'

=======
import NavBar from '../components/NavBar' 
//TODO put actual documentation
//Holds the documentation for the website itself such as how to use it 
//and holds documentation for other relevent apps such as infor macros
>>>>>>> 86ce0c521c010762e5ec2a44cced784e583b9a5a
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