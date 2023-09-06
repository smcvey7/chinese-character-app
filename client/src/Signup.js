import React, {useState, useEffect} from "react";
import CountrySelector from "./CountrySelector";
import QRCode from "qrcode";

function Signup(){
  const [role, setRole] = useState("student")
  const [class_id, setClassId] = useState(0)
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    first_language: "",
    country: "",
    school: "",
    years_studied: 0,
  })
  const [code, setCode] = useState(null)


useEffect(()=>{
  const params = new URL(window.location).searchParams

  setClassId(params.get("class_id"))

  QRCode.toCanvas(document.getElementById('canvas'), params.get("class_id"), function (error) {
    if (error) console.error(error)
    console.log('success!');
  })
}, [])

  function handleChange(e){
    const key = e.target.name
    const value = e.target.value
    setNewUserInfo({
      ...newUserInfo,
      [key]: value
    })
  }

  function handleChangeRole(e){
    setRole(e.target.value)
  }

  function handleChangeId(e){
    setClassId(e.target.value)
  }

  function checkAvailability(e){
    e.preventDefault()
    console.log("checking availability of: ", newUserInfo.username)
  }


  return(
    <div>
      <canvas id="canvas">
        {code}
      </canvas>
      <div className="mb-3">
        <h1>Signup</h1>
        I am a:<select value={role} onChange={handleChangeRole}>
          <option value="student">student</option>
          <option value="teacher">teacher/researcher</option>
        </select>
        <form>
          {
            role === "student" ?
            <div>
              <label htmlFor="exampleClassId" className="form-label">class id</label>
              <input name="class_id" className="form-control" value={class_id} onChange={handleChangeId} />
            </div>
            :
            <></>
          }
        <label htmlFor="exampleFirstName" className="form-label">first name</label>
        <input autoComplete="first-name" className="form-control" name="first_name" value={newUserInfo.first_name} onChange={handleChange} /><br/>
        <label htmlFor="exampleLastName" className="form-label">last name</label>
        <input name="last-name" className="form-control" autoComplete="last-name" value={newUserInfo.last_name} onChange={handleChange} /><br/>
        <label htmlFor="exampleCountry" className="form-label">country</label>
        <CountrySelector newUserInfo={newUserInfo} setNewUserInfo={setNewUserInfo} />
        <label htmlFor="exampleSchool" className="form-label">school</label>
        <input name="school" className="form-control" value={newUserInfo.school} onChange={handleChange} /><br/>
        <label htmlFor="exampleUsername" className="form-label">username</label>
        <input name="username" className="form-control" value={newUserInfo.username} onChange={handleChange} /><button onClick={checkAvailability}>check availability</button><br/>
        <label htmlFor="exampleEmail" className="form-label">email</label>
        <input autoComplete="email" className="form-control" name="email" value={newUserInfo.email} onChange={handleChange} /><br/>
        <label htmlFor="examplePassword" className="form-label">password</label>
        <input autoComplete="new-password" className="form-control" type="password" name="password" value={newUserInfo.password} onChange={handleChange} /><br/>
        <label htmlFor="examplePasswordConfirmation" className="form-label">confirm password</label>
        <input autoComplete="new-password" className="form-control" type="password" name="password_confirmation" value={newUserInfo.password_confirmation} onChange={handleChange} /><br/>
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}

export default Signup