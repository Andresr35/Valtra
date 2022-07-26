import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import ShopifyRequest from '../api/ShopifyRequest';
import { VariantsContext } from '../context/VariantsContext'

/**
 * This page shows one product from shopify and should be able to edit at least the featured 
 * image and the variants image at fisrt TODO:
 * 
 */
const ShopifyVariants = () => {
    const{variants,setVariants} = useContext(VariantsContext);
    const {id} = useParams()
    useEffect(() =>{
      try{
      const fetchData = async(id) =>{
        const response = await ShopifyRequest.get(`/product/${id}`)
        console.log(response)
        console.log(id)
      }
      fetchData(id);
    }catch(err){
      console.log(err);
    }
    })

  //TODO:  Get a page up for the featured image and the variants image....
  // how should the fornt end look like??? Try to copy as much from shopify's setup
  return (
    <div>
      <h2> </h2>
      
    </div>
  )
}

export default ShopifyVariants
