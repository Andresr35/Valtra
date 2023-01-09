import React from 'react'
import NavBar from '../components/structure/NavBar'
import OrderList from '../components/ShopifyOrders' 
import Container from 'react-bootstrap/esm/Container'

const OrderPage = () => {
  return (
    <div> 
      <NavBar/> 
      <Container>
        <OrderList/> 
      </Container>
    </div>
  )
}

export default OrderPage
