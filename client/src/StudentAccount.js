import React, {useContext, useState, useEffect} from "react";
import MyContext from "./MyContext";

function StudentAccount(){
  const {user, setUser} = useContext(MyContext)
  const [userUpdate, setUserUpdate] = useState(null)
  const [edit, setEdit] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(()=>{
    if (!user){
      return
    }
    setUserUpdate(user)
  }, [user, edit])

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
          setErrors(error_list.error)
        })
      }
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
          <h2>Account info</h2>
          <h3>Class name</h3>
          <em>{user.class_group.name}</em>
          <h3>Instructor</h3>
          <em>{user.teacher.last_name}</em>
          <div className="d-flex flex-row justify-content-around">
            <div className="card forty">
              <h3>Student info</h3>
              <div>
                {userUpdate ? <form onSubmit={handleSubmit} id="editStudentInfo">
                  {edit ? <em> editing</em> : <></>}<br/>
                  <input name="username" value={userUpdate.username} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>username</label><br/>
                  <input name="email" value={userUpdate.email} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>email</label><br/>
                  <input name="first_name" value={userUpdate.first_name} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>first name</label><br/>
                  <input name="last_name" value={userUpdate.last_name} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>last name</label><br/>
                  <input name="first_language" value={userUpdate.first_language} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>first language</label><br/>
                  <input name="other_L2" value={userUpdate.other_L2} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>other L2</label><br/>
                  <input name="school" value={userUpdate.school} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>school</label><br/>
                  <input type="number" name="home_learning" value={userUpdate.home_learning} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>home learning</label><br/>
                  <input type="number" name="class_learning" value={userUpdate.class_learning} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>class learning</label><br/>
                  <input type="number" name="age" value={userUpdate.age} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>age</label><br/>
                  <input name="other_info" value={userUpdate.other_info} onChange={handleChange} readOnly={!edit}/><br/>
                  <label>other info</label><br/>

                  <button onClick={changeEdit}>{edit ? "Cancel" : "Edit"}</button>
                  {edit ? <input id="editStudentInfoSubmit" type="submit" /> : <></>}
                </form> : <></>}
                <ul>
                  {errors ? errors.map((error, index)=>{
                    return(
                      <li key={index}>{error}</li>
                    )
                  }) : <></>}
                </ul>
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
