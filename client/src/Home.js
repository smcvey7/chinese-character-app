import React, {useContext} from "react";
import MyContext from "./MyContext";

function Home(){
  const {user} = useContext(MyContext)

  return(
    <div className="topMargins wide primary-color d-flex flex-column align-items-center justify-content-center">
      <h1>Welcome {user ? `, ${user.username}` : ""}</h1>
      {user ? <></> : <em>Create an account or login to get started.</em>}
    </div>
  )
};

export default Home