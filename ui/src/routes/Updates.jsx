import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import NavBar from '../components/NavBar' 
import {Version} from '../components/Version'

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