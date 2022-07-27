import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import AddProduct from '../components/DBAddProduct'
import Header from '../components/structure/Header'
import NavBar from '../components/structure/NavBar'
import ProductList from '../components/DBProducts'

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
