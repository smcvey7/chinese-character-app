import React, {useState, useEffect} from "react";
import CountrySelector from "./CountrySelector";
import QRCode from "qrcode";

function Signup({QRUUID}){
  const [role, setRole] = useState("student")
  const [available, setAvailable] = useState("")
  const [noClass, setNoClass] = useState(false)
  const [classUuid, setClassUuid] = useState("")
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


useEffect(()=>{
  const params = new URL(window.location).searchParams

  setClassUuid(params.get("class_id"))
}, [])

  function handleNoClass(e){
    setNoClass(e.target.checked)
    setClassUuid(e.target.checked ? "d6f927bc-fed7-4ab2-b78d-aefdeef134b1" : QRUUID)
  }

  function handleChange(e){
    const key = e.target.name
    const value = e.target.value
    setNewUserInfo({
      ...newUserInfo,
      [key]: value
    })
  }

  function handleChangeUuid(e){
    setClassUuid(e.target.value)
  }

  function handleChangeRole(e){
    setRole(e.target.value)
  }


  function checkAvailability(e){
    e.preventDefault()
    console.log("checking availability of: ", newUserInfo.username)
    fetch(`/availability/${newUserInfo.username}`)
    .then((r)=>r.json())
    .then((data)=>{
      setAvailable(data)
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log("submitting: ", newUserInfo)
    fetch(`/${role}s`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({newUserInfo: newUserInfo, classUuid: classUuid})
    })
    .then((r)=>r.json())
    .then((data)=>{
      console.log(data)
      if (data.errors){
        alert(data.errors)
      }else{
        alert("account created")
        window.location.href = "/login"
      }
    })
  }

  return(
    <div>
      <div className="card full topMargins">
        <h1>Signup</h1>
        I am a:<select value={role} onChange={handleChangeRole}>
          <option value="student">student</option>
          <option value="teacher">teacher/researcher</option>
        </select>
        <form onSubmit={handleSubmit}>
          {
            role === "student" ?
            <div>
              <label htmlFor="exampleClassId" className="form-label topMargins">class id</label>
              <input name="class_uuid" className="form-control" value={classUuid} disabled={noClass || QRUUID ? true : false} onChange={handleChangeUuid} />
              <input type="checkbox" name="no_class" onChange={handleNoClass} checked={noClass} /> not part of a class<br/>
              <label htmlFor="exampleLanguage" className="form-label topMargins">first language</label>
              <input name="first_language" className="form-control" value={newUserInfo.first_language} onChange={handleChange} /><br/>
              <label htmlFor="exampleYearsStudied" className="form-label">years of chinese studied</label>
              <input type="number" min="0" max="100" name="years_studied" className="form-control" value={newUserInfo.years_studied} onChange={handleChange} /><br/>

            </div>
            :
            <></>
          }
        <label htmlFor="exampleFirstName" className="form-label">first name</label>
        <input autoComplete="first-name" className="form-control" name="first_name" value={newUserInfo.first_name} onChange={handleChange} /><br/>
        <label htmlFor="exampleLastName" className="form-label">last name</label>
        <input name="last_name" className="form-control" autoComplete="last-name" value={newUserInfo.last_name} onChange={handleChange} /><br/>
        <label htmlFor="exampleCountry" className="form-label">country</label>
        <div className="half">
          <CountrySelector newUserInfo={newUserInfo} setNewUserInfo={setNewUserInfo} />
        </div>
        <label htmlFor="exampleSchool" className="form-label">school</label>
        <input name="school" className="form-control" value={newUserInfo.school} onChange={handleChange} /><br/>
        <label htmlFor="exampleEmail" className="form-label">email</label>
        <input autoComplete="email" className="form-control" name="email" value={newUserInfo.email} onChange={handleChange} /><br/>
        <label htmlFor="exampleUsername" className="form-label">username</label>
        <input name="username" className="form-control" value={newUserInfo.username} onChange={handleChange} />
        {available === "" ? <></> : available ? <p className="green">available</p> : <p className="red">not available</p>}
        <button onClick={checkAvailability}>check availability</button><br/>
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