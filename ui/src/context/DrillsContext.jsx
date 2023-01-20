import React, { useState, createContext } from "react";

export const DrillsContext = createContext();

export const DrillsContextProvider = (props) => {
  const [drills, setDrills] = useState({});

  /**
   * will change the state to the new insert you want
   *
   * @param   {int}  id      id of the insert you want to change
   * @param   {string}  event    the key that you want to change
   * @param   {string}  change  the value of whatever you want to change it to
   *
   * @return  {[type]}          [return description]
   */
  const changeDrill = (id, change, event) => {
    try {
      drills[id][change] = event.target.value
      setDrills(drills)
    } catch (error) {
      throw new Error("Change type is not accepted.")
    }
  }

  return (
    <DrillsContext.Provider value={{ drills, setDrills, changeDrill }}>
      {props.children}
    </DrillsContext.Provider>
  );
};