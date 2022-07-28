import React, { useState, createContext } from "react";

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };
  return (
    <ProductsContext.Provider value={{ products, setProducts, addProduct }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
