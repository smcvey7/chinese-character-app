import React, { createContext, useState } from "react";

const MyContext = createContext();

export function MyProvider({children}){
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState(null);

  const contextValues = {
    user,
    setUser,
    activities,
    setActivities
  };

  return(
    <MyContext.Provider value={contextValues}>
      {children}
    </MyContext.Provider>
  )
}

export default MyContext;