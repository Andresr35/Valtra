import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { VariantsContext } from '../context/VariantsContext'

const ShopifyVariants = () => {
    const{variants,setVariants} = useContext(VariantsContext);
    const {id} = useParams()
    console.log(id)
  return (
    <div>
      
    </div>
  )
}

export default ShopifyVariants
