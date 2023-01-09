import React from 'react'
import NavBar from '../../components/structure/NavBar'
import Container from 'react-bootstrap/esm/Container'
import InsertsTable from '../../components/InsertsTable'

const InsertPage = () => {
  return (
    <div> 
      <NavBar/> 
      <Container>
        <InsertsTable/>
      </Container>
    </div>
  )
}

export default InsertPage
