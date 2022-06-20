import React from 'react'
//import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
//import { ProductsContext } from '../context/ProductsContext';
import { useEffect } from 'react';
import ProductFinder from '../api/ProductFinder';

const UpdateProduct = (props) => {
    let navigate = useNavigate();
   //const {products} = useContext(ProductsContext)
   const {id} = useParams();
   const[ids,setID] = useState("");
   const[description,setDescription] = useState("");

   useEffect( () => {
    const fetchData = async() => {
        try{
            const response = await ProductFinder.get(`/${id}`);
            setID(response.data.data.products.id);
            setDescription(response.data.data.products.description);
        }catch(err){}
    };
    fetchData(); 
    },[id]);
    
    const handleSubmit= async(e) =>{
        e.preventDefault();
        await ProductFinder.put(`/${id}`,{
            ids,description
        });
        navigate("/");
    }

  return (
    <div> 
        
      <form action="">
          {/* This is the form part for changing the id */}
          <div className="form-group">
              <label htmlFor="id">ID</label>
              <input value = {ids} onChange = {e => setID(e.target.value)} type="text" className="form-control" id = "id" />
          </div>
        {/* this is the form part for the description */}
          <div className="form-group">
              <label htmlFor="description">Description</label>
              <input value = {description} onChange = {e => setDescription(e.target.value)} type="text" className="form-control" id = "description" />
          </div>
          <button type='submit' onClick={handleSubmit} className="btn btn-primary">Update</button>
      </form>
    </div>
  )
}

export default UpdateProduct
