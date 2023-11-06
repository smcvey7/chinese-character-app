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
  const [teacher, setTeacher] = useState(null)

  useEffect(()=>{
    if (user){
      navigate("/")
    }
    const params = new URL(window.location).searchParams
    if (params.get("class_id")){
      setHasAccount(false)
      setQRUUID(params.get("class_id"))
      fetch(`/find_class_group/${params.get("class_id")}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((r)=>{
        if (r.ok){
          r.json().then((data)=>{
            if (data){
              setTeacher(data.teacher)
            }
          })
        }else{r.json().then((data)=>console.log(data.errors))
        }
      })
    }
  }, [user, navigate]) 
  
    return(
    <div className="card topMargins full">
      <a className="signUpToggle" onClick={()=>setHasAccount(!hasAccount)}>{hasAccount ? "Create an account" : "Log in"}</a>
      {hasAccount ? <Login/> : <Signup QRUUID={QRUUID} teacher={teacher}/>}
    </div>
    )}

export default GetStarted