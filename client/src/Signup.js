import React, {useState, useEffect} from "react";
import CountrySelector from "./CountrySelector";

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
    other_L2: "",
    country: "",
    school: "",
    age: 0,
    class_learning: 0,
    home_learning: 0,
    other_info: ""
  })
  const [errors, setErrors] = useState([])



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

  function handleChangeRole(e){
    setRole(e.target.value)
  }


  function checkAvailability(e){
    e.preventDefault()
    fetch(`/availability/${newUserInfo.username}`)
    .then((r)=>r.json())
    .then((data)=>{
      setAvailable(data)
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    fetch(`/${role}s`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({newUserInfo: newUserInfo, classUuid: classUuid})
    })
    .then((r)=>r.json())
    .then((data)=>{
      if (data.ok){
        alert("account created")
        window.location.href = "/login"
      }else{
        setErrors(data.errors)
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
          {role === "student" ?
            <div>
              <label htmlFor="exampleClassId" className="form-label topMargins">class id</label>
              <input name="class_uuid" className="form-control" value={classUuid} disabled={noClass || QRUUID ? true : false} onChange={(e)=>setClassUuid(e.target.value)} />
              <input type="checkbox" name="no_class" onChange={handleNoClass} checked={noClass} /> not part of a class<br/>
              <label htmlFor="exampleLanguage" className="form-label topMargins">first language</label>
              <input name="first_language" className="form-control" value={newUserInfo.first_language} onChange={handleChange} /><br/>
              <label htmlFor="exampleAge" className="form-label">age</label>
              <input type="number" min="0" max="100" name="age" className="form-control" value={newUserInfo.age} onChange={handleChange} /><br/>
              <label htmlFor="exampleClassLearning" className="form-label">Years spent learning Chinese in a formal class</label>
              <input type="number" min="0" max="100" name="class_learning" className="form-control" value={newUserInfo.class_learning} onChange={handleChange} /><br/>
              <label htmlFor="exampleHomeLearning" className="form-label">Years spent learning Chinese independently (at home)</label>
              <input type="number" min="0" max="100" name="home_learning" className="form-control" value={newUserInfo.home_learning} onChange={handleChange} /><br/>
              <label htmlFor="exampleOtherL2" className="form-label">other languages spoken</label>
              <input name="other_L2" className="form-control" value={newUserInfo.other_L2} onChange={handleChange} /><br/>
              <label htmlFor="exampleOtherInfo" className="form-label">other info</label>
              <textarea name="other_info" className="form-control" value={newUserInfo.other_info} onChange={handleChange} /><br/>
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
        <div>
          <ul>
            {errors.map((error)=>{
              return(
                <li className="red" key={error}>{error}</li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Signup