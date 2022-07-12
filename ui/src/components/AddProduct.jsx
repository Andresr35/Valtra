import React from "react";
import { useContext } from "react";
import { useState } from "react";
import ProductFinder from "../api/ProductFinder";
import { ProductsContext } from "../context/ProductsContext";

const AddProduct = () => {
  const { addProduct } = useContext(ProductsContext);
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ProductFinder.post("/", {
        //backend name first
        id: id,
        description: description,
      });
      addProduct(response.data.data.product);
      console.log(response);
    } catch {}
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              type={id}
              onChange={(e) => setId(e.target.value)}
              className="form-control"
              placeholder="ID"
            />
          </div>
          <div className="col">
            <input
              className="form-control"
              type={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
