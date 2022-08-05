import React from 'react'
import Container from 'react-bootstrap/esm/Container'
<<<<<<< HEAD
import NavBar from '../components/structure/NavBar'

=======
import NavBar from '../components/NavBar'
//TODO put actual documentation
//Holds the documentation for the website itself such as how to use it 
//and holds documentation for other relevent apps such as infor macros 
// however this is a restricted version that does not reuire a sign in, 
// this is done to enable easy access from other documentation pageXOffset, so that 
// users of already distributed applications can view updated documentation
>>>>>>> 86ce0c521c010762e5ec2a44cced784e583b9a5a
const DocumentationRestricted = () => { 
  return ( 
    <div>
      <NavBar/> 
      <Container>
<<<<<<< HEAD
        {/* <a> Welcome to Documentation with restricted acess</a>  */}
=======
        <p> Welcome to Documentation with restricted acess</p> 
>>>>>>> 86ce0c521c010762e5ec2a44cced784e583b9a5a
      </Container>
    </div>
  )
}

export default DocumentationRestricted