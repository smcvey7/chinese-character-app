import React, {useState} from "react";
import Login from "./Login";
import Signup from "./Signup";

function GetStarted(){

  const [hasAccount, setHasAccount] = useState(true)

  return(
    <div>
      <button onClick={()=>setHasAccount(!hasAccount)}>{hasAccount ? "Sign up" : "Log in"}</button>
      {hasAccount ? <Login/> : <Signup/>}
    </div>
  )
}

export default GetStarted