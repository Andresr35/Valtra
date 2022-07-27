import React from 'react'
import ShopifyVariants from '../components/ShopifyVariants'
import NavBar from '../components/structure/NavBar'

/**
 * Edit products 
 * 
 */
const Variants = () => {
  return (
    <div className="main">
      <NavBar/>
      <ShopifyVariants/>
    </div>
  )
}

export default Variants
