import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import AddProduct from '../components/AddProduct'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import ProductList from '../components/ProductList'

const Home = () => { 
  return ( 
    <div>
      <NavBar/> 
      <Container>
        <Header/>
        <AddProduct/>
        <ProductList/> 
      </Container>
    </div>
  )
}

export default Home
