import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/structure/NavBar'
//TODO actaully app conent that can be downloaded 
//Allows users to have a centalized place to 
//downlaod content such as infor apps
const Downloads = () => { 
  return ( 
    <div>
      <NavBar/> 
      <Container>
        <p>Welcome to Downloads</p> 
      </Container>
    </div>
  )
}

export default Downloads