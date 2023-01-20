import React, { useState, createContext } from "react";

export const InsertsContext = createContext();

export const InsertsContextProvider = (props) => {
  const [inserts, setInserts] = useState({});

  /**
   * will change the state to the new insert you want
   *
   * @param   {int}  id      id of the insert you want to change
   * @param   {string}  event    the key that you want to change
   * @param   {string}  change  the value of whatever you want to change it to
   *
   * @return  {[type]}          [return description]
   */
  const changeInsert = (id, change, event) => {
    try {
      inserts[id][change] = event.target.value
      setInserts(inserts)

    } catch (error) {
      throw new Error("Change type is not accepted.")
    }

  }

  return (
    <InsertsContext.Provider value={{ inserts, setInserts, changeInsert }}>
      {props.children}
    </InsertsContext.Provider>
  );
};