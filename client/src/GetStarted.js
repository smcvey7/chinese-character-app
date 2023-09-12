import React, {useState, useEffect} from "react";
import Login from "./Login";
import Signup from "./Signup";

function GetStarted(){

  const [hasAccount, setHasAccount] = useState(true)
  const [QRUUID, setQRUUID] = useState("")

  useEffect(()=>{
    const params = new URL(window.location).searchParams
    if (params.get("class_id")){
      setHasAccount(false)
      setQRUUID(params.get("class_id"))
    }
  }, [])  

  return(
    <div>
      <button onClick={()=>setHasAccount(!hasAccount)}>{hasAccount ? "Sign up" : "Log in"}</button>
      {hasAccount ? <Login/> : <Signup QRUUID={QRUUID}/>}
    </div>
  )
}

export default GetStarted