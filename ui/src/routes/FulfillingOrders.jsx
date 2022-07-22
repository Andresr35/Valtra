import React from 'react'
import Fulfill from '../components/Fulfill'
import NavBar from '../components/NavBar' 
import Container from 'react-bootstrap/esm/Container'

const FulfillingOrders = () => {
  return (
    <div> 
      <NavBar/> 
      <Container>
        <Fulfill/> 
      </Container>
    </div>
  )
}

export default FulfillingOrders
