import React from 'react'
import AddProduct from '../components/AddProduct'
import Header from '../components/Header'
import ProductList from '../components/ProductList'

const Home = () => {
  return (
    <div>
      <Header/>
      <AddProduct/>
      <ProductList/>
    </div>
  )
}

export default Home
