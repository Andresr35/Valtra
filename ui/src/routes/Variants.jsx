import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Variants = () => {
    const{id} =useParams();

  return (
    <div>
      <NavBar/>
    </div>
  )
}

export default Variants
