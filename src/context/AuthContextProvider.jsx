import React, { createContext, useState } from 'react'



export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
const [currentUser, setCurrentUser] = useState(false);



  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider