import React, { useEffect, useState, useContext } from "react";


const UserContext = React.createContext();

// Provider pattern: https://medium.com/@vitorbritto/react-design-patterns-provider-pattern-b273ba665158
export const UserContextProvider = ({ children }) => {


    return (
        <UserContext.Provider value={"Hello"}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
  return useContext(UserContext);
};