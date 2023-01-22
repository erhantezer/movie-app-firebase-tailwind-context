import React, { createContext, useState } from 'react'



export const AuthContext = createContext();
//* with custom hook
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };


const AuthContextProvider = ({children}) => {
const [currentUser, setCurrentUser] = useState(false);



  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider