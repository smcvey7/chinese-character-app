import React, {useContext, useState, useEffect} from "react";
import MyContext from "./MyContext";
import {useNavigate} from "react-router-dom";

function StudentAccount(){
  const {user, setUser} = useContext(MyContext)
  const [userUpdate, setUserUpdate] = useState(null)
  const [edit, setEdit] = useState(false)
  const [errors, setErrors] = useState(null)
  const [deleteAccount, setDeleteAccount] = useState(false)
  const [deleteAccountError, setDeleteAccountError] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    if (!user){
      return
    }
    setUserUpdate(user)
    errors ? console.log(errors) : console.log("no errors")
  }, [user, edit, errors])

  function handleChange(e){
    const key = e.target.name
    const value = e.target.value
    setUserUpdate({
      ...userUpdate,
      [key]: value
    })
  }

  function changeEdit(e){
    e.preventDefault()
    setEdit(!edit)
  }

  function handleSubmit(e){
    e.preventDefault()
    fetch(`/students/${user.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userUpdate)
    })
    .then((r)=>{
      if (r.ok){
        r.json().then((data)=>{
          setUser(data)
          setEdit(false)
        })
      }else{
        r.json().then((error_list)=>{
          console.log("new error list", error_list)
          setErrors(error_list)
        })
      }
    })
  }

  function handleDeleteAccount(e){
    e.preventDefault()
    if (!deleteAccount){
      setDeleteAccountError("Please check the box to confirm account deletion")
      return
    }
    fetch(`/students/${user.id}`, {
      method: "DELETE"
    })
    .then((r)=>{
      setDeleteAccountError(null)
      setUser(null)
      navigate("/")
    })
  }

  if (!user){
    return(
      <em>Please log in to view your account</em>
    )
  }

  return(
    <div>
      <div id="testCard" className="full  topMargins">
        <div className=" border d-flex flex-column">
          <div className="d-flex flex-row justify-content-between">
            <h2>Account info</h2>
            <div className="d-flex flex-column">
              <div>
                <label className="margin-small">check to confirm delete </label>
                <input onChange={(e)=>setDeleteAccount(e.target.checked)} className="margin-small" type="checkbox" name="delete" value={deleteAccount} />
                <button onClick={handleDeleteAccount}>Delete Account</button>
              </div>
              <em className='red' >{deleteAccountError}</em>
            </div>
          </div>
          
          <h4>Class name: <em>{user.class_group.name}</em></h4>
          
          <h4>Instructor: <em>{user.teacher.last_name}</em></h4>
          
          <div className="d-flex flex-row justify-content-around">
            <div className="card forty">
              <h3>Student info</h3>
              <div className="d-flex flex-row justify-content-between">
                {userUpdate ? <form onSubmit={handleSubmit} id="editStudentInfo">
                  <label>username</label><br/>
                  {edit ? <input name="username" value={userUpdate.username} onChange={handleChange}/> : <strong>{user.username}</strong>}<br/>
                  <label>email</label><br/>
                  {edit ? <input name="email" value={userUpdate.email} onChange={handleChange}/> : <strong>{user.email}</strong>}<br/>
                  <label>first name</label><br/>
                  {edit ? <input name="first_name" value={userUpdate.first_name} onChange={handleChange}/> : <strong>{user.first_name}</strong>}<br/>
                  <label>last name</label><br/>
                  {edit ? <input name="last_name" value={userUpdate.last_name} onChange={handleChange}/> : <strong>{user.last_name}</strong>}<br/>
                  <label>first language</label><br/>
                  {edit ? <input name="first_language" value={userUpdate.first_language} onChange={handleChange}/> : <strong>{user.first_language}</strong>}<br/>
                  <label>other L2</label><br/>
                  {edit ? <input name="other_L2" value={userUpdate.other_L2} onChange={handleChange}/> : <strong>{user.other_L2}</strong>}<br/>
                  <label>school</label><br/>
                  {edit ? <input name="school" value={userUpdate.school} onChange={handleChange}/> : <strong>{user.school}</strong>}<br/>
                  <label>home learning</label><br/>
                  {edit ? <input type="number" name="home_learning" value={userUpdate.home_learning} onChange={handleChange}/> : <strong>{user.home_learning}</strong>}<br/>
                  <label>class learning</label><br/>
                  {edit ? <input type="number" name="class_learning" value={userUpdate.class_learning} onChange={handleChange}/> : <strong>{user.class_learning}</strong>}<br/>
                  <label>age</label><br/>
                  {edit ? <input type="number" name="age" value={userUpdate.age} onChange={handleChange}/> : <strong>{user.age}</strong>}<br/>
                  <label>other info</label><br/>
                  {edit ? <textarea name="other_info" value={userUpdate.other_info} onChange={handleChange}/> : <strong>{user.other_info}</strong>}<br/>

                  <button onClick={changeEdit}>{edit ? "Cancel" : "Edit"}</button>
                  {edit ? <input id="editStudentInfoSubmit" type="submit" /> : <></>}
                </form> : <></>}
                <div className="d-flex flex-column justify-content-around">
                  <ul>
                    {errors ? errors.errors.map((error)=>{
                      return(
                        <li className="red" key={error}>{error}</li>
                      )
                    }) : <></>}

                  </ul>
                </div>
              </div>
            </div>
            <div className="card forty">
              <h3>Test History</h3>
              <div className="d-flex justify-content-around topMargins">
                <table>
                  <thead>
                    <tr>
                      <th>Attempt</th>
                      <th>Raw Score</th>
                      <th>Estimated Characters recognized</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.scores.map((score, index)=>{
                      return(
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{score}</td>
                          <td>{score * 20}</td>
                        </tr>
                      )}
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default StudentAccount
