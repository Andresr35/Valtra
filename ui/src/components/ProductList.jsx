import React, {useEffect} from 'react';
import { useContext } from 'react';
import ProductFinder from '../api/ProductFinder';
import { ProductsContext } from '../context/ProductsContext';
import { useNavigate } from "react-router-dom";

const ProductList = (props) => {

    const {products,setProducts} = useContext(ProductsContext);
    let navigate = useNavigate();


// GETs the data from backend and puts them in the products context
    useEffect( () => {
        const fetchData = async() => {
            try{
                const response = await ProductFinder.get("/");
                setProducts(response.data.data.products);
             }catch(err){}
        };
        fetchData(); 
    },[]);


// Event handler for delete products on tablee
    const handleDelete= async(id)=>{
        try{
            const response=await ProductFinder.delete(`/${id}`);
            setProducts(products.filter(product=>{
                return product.id !== id;
            }))
        }catch(err){console.log(err);
        }
    }


// Event handler for updating products on table
    const handleUpdate = (id) =>{
        navigate(`/products/${id}/update`);
    }


//actual html of the product table
  return (
    <div className='list-group'>
      <table className="table table-hover table-dark">
          <thead>
              <tr className="bg-primary">
                  <th scope = "col">id</th>
                  <th scope = "col">description</th>
                  <th scope = "col">edit</th>
                  <th scope = "col">delete</th>
              </tr>
          </thead>
          <tbody>
              {products && products.map(product => {
                  return(
                    <tr key = {product.id}>
                        <td>{product.id}</td>
                        <td>{product.description}</td>
                        <td><button onClick={() =>handleUpdate(product.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={() =>handleDelete(product.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                  )})}

              {/* <tr>
                  <td>1</td>
                  <td>whatever</td>
                  <td><button className="btn btn-warning">Update</button></td>
                  <td><button className="btn btn-danger">Delete</button></td>
              </tr>
              <tr>
                  <td>1</td>
                  <td>whatever</td>
                  <td><button className="btn btn-warning">Update</button></td>
                  <td><button className="btn btn-danger">Delete</button></td>
              </tr> */}
          </tbody>
      </table>
    </div>
  )
}

export default ProductList
