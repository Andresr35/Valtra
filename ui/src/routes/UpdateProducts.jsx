import React from "react";
import NavBar from '../components/structure/NavBar'
import UpdateProduct from "../components/UpdateProduct";

const UpdateProducts = () => {
  return (
    <div>
      <NavBar />
      <h1 className="text-center">Update Product</h1>
      <UpdateProduct />
    </div>
  );
};

export default UpdateProducts;
