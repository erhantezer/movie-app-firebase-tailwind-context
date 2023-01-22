import React, { createContext, useState } from 'react'

const AuthContextProvider = () => {
const [currentUser, setCurrentUser] = useState(false);

const AuthContext = createContext()

  return (
    <div>AuthContextProvider</div>
  )
}

export default AuthContextProvider