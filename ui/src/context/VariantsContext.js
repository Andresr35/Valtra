// This passes around the current Variants a user is looking at
import React, { useState, createContext } from "react";

export const VariantsContext = createContext();

export const VariantsContextProvider = (props) => {
  const [variants, setVariants] = useState([]);

  const addOrder = (variant) => {
    setVariants([...variants, variant]);
  };
  return (
    <VariantsContext.Provider value={{ variants, setVariants, addOrder }}>
      {props.children}
    </VariantsContext.Provider>
  );
};
