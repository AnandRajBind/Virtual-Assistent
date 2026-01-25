import React from 'react'
import { createContext } from 'react';


export  const userDataContext=createContext();
const serverUrl="http://localhost:8000";
const value={
serverUrl
}

function UserContext({children}) {
  return (
    <div>  
        <userDataContext.Provider value={value}>
        {children}
        </userDataContext.Provider>
    </div>
  )
}
export default UserContext;