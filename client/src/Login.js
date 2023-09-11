import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "./MyContext";


function Login(){
  const {setUser} = useContext(MyContext)
  const [role, setRole] = useState("student")
  const [isLoading, setIsLoading]=useState(false)
  const [errors, setErrors]=useState(null)
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  })

  function onLogin(user){
    setUser(user)
  }

  function resetUserData(){
    setUserInfo(
      {
        username: "",
        password: ""
      }
    )
  }

  function handleChange(e){
    const key = e.target.name
    const value = e.target.value
    setUserInfo({
      ...userInfo,
      [key]: value
    })
  }

  function handleChangeRole(e){
    setRole(e.target.value)
  }

  function handleLogin(e){
    e.preventDefault()
    setIsLoading(true)
    if (userInfo.username === "" || userInfo.password === ""){
      setErrors("username/password cannot be blank")
      setIsLoading(false)
      return null
    }
    fetch('/login', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({userInfo: userInfo, role: role})
    })
    .then((r)=>{
      setIsLoading(false)
      if (r.ok){
        r.json().then((user)=>{
          onLogin(user)
          resetUserData()
          navigate("/")
        })
      }else{
        r.json().then((error_list)=>{
          setErrors(error_list.error)
        })
            }
    })
  }

  return (
    <div className="card topMargins full">
      <h3>Log in</h3>
      I am a:<select value={role} onChange={handleChangeRole}>
          <option value="student">student</option>
          <option value="teacher">teacher/researcher</option>
        </select>
      <div className="d-flex flex-row justify-content-around">
        <form className="card" id="form" onSubmit={handleLogin} >
          <label htmlFor="exampleUsername" className="form-label">username</label>
          <br/><input autoComplete="username" autoCapitalize="none" name="username" value={userInfo.username} onChange={handleChange} ></input><br/>
          <label htmlFor="examplePassword" className="form-label ">password</label>
          <br/><input autoComplete="current-password" type="password" name="password" value={userInfo.password} onChange={handleChange} /><br/>
          <button className="topMargins" type="submit" >{isLoading ? "Loading..." : "Submit"}</button>
        </form>
        <div className="errors topMargins ">
          {errors ? <ul><li>{errors}</li></ul> : <div/>}
        </div>
      </div>
    </div>
  )

}

export default Login