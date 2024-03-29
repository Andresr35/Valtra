import React, { useState, createContext } from "react";

export const TapsContext = createContext();

export const TapsContextProvider = (props) => {
  const [taps, setTaps] = useState({});

  /**
   * will change the state to the new insert you want
   *
   * @param   {int}  id      id of the insert you want to change
   * @param   {string}  event    the key that you want to change
   * @param   {string}  change  the value of whatever you want to change it to
   *
   * @return  {[type]}          [return description]
   */
  const changeTap = (id, change, event) => {
    try {
      taps[id][change] = event.target.value
      setTaps(taps)
    } catch (error) {
      throw new Error("Change type is not accepted.")
    }
  }

  return (
    <TapsContext.Provider value={{ taps, setTaps, changeTap }}>
      {props.children}
    </TapsContext.Provider>
  );
};