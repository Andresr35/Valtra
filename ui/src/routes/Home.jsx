import React from 'react'
import AddProduct from '../components/AddProduct'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import ProductList from '../components/ProductList'

const Home = () => {
  return (
    <div>
      <NavBar/>
      <Header/>
      <AddProduct/>
      <ProductList/>
    </div>
  )
}

export default Home
