import React, { createContext, useState } from "react";

const MyContext = createContext();

export function MyProvider({children}){
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState(null);

  const contextValues = {
    user,
    setUser,
    characters,
    setCharacters
  };

  return(
    <MyContext.Provider value={contextValues}>
      {children}
    </MyContext.Provider>
  )
}

export default MyContext;