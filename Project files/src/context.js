import React, { useState, createContext } from "react";

export const Context = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState(undefined);

  return (
    //Application will provide the following:
    <Context.Provider value={[state, setState]}>{/*Providing what the app needs access to   */}
        {children}
    </Context.Provider>
  );
};
export default UserProvider;
