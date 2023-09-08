import React, {useContext} from "react";
import MyContext from "./MyContext";

function Home(){
  const {user} = useContext(MyContext)

  return(
    <div className="wide primary-color d-flex align-items-center justify-content-center">
      <h1>Welcome {user ? user.username : "user"}</h1>
      
    </div>
  )
};

export default Home