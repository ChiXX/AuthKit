import React, { useEffect, useState, useContext } from "react";


const UserContext = React.createContext();


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