import React, {useState, useEffect, useContext} from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import MyContext from "./MyContext";

function GetStarted(){
  const {user} = useContext(MyContext)
  const navigate = useNavigate()
  const [hasAccount, setHasAccount] = useState(true)
  const [QRUUID, setQRUUID] = useState("")

  useEffect(()=>{
    if (user){
      navigate("/")
    }
    const params = new URL(window.location).searchParams
    if (params.get("class_id")){
      setHasAccount(false)
      setQRUUID(params.get("class_id"))
    }
  }, [user, navigate]) 
  
    return(
    <div>
      <button onClick={()=>setHasAccount(!hasAccount)}>{hasAccount ? "Sign up" : "Log in"}</button>
      {hasAccount ? <Login/> : <Signup QRUUID={QRUUID}/>}
    </div>
    )}

export default GetStarted