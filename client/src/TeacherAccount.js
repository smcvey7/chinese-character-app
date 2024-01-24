import React, {useContext, useState, useEffect} from "react";
import MyContext from "./MyContext";
import CreateNewClass from "./CreateNewClass";
import MyClasses from "./MyClasses";
import SelectedClass from "./SelectedClass";
import { useNavigate } from "react-router-dom";

function TeacherAccount(){
  const {user, setUser} = useContext(MyContext)
  const [selectedClass, setSelectedClass] = useState(null)
  const [classStudents, setClassStudents] = useState([])
  const [deleteAccount, setDeleteAccount] = useState(false)
  const [deleteAccountError, setDeleteAccountError] = useState(null)
  const navigate = useNavigate()

  
  useEffect(()=>{
    if (!selectedClass){
      return
    }

  }, [selectedClass, user, classStudents])

  function handleDeleteAccount(e){
    e.preventDefault()
    if (user.username === "exampleteacher"){
      return
    }
    if (!deleteAccount){
      setDeleteAccountError("Please check the box to confirm account deletion")
      return
    }
    fetch(`/teachers/${user.id}`, {
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
  )}
  return(
    <div className="full topMargins">
      <div className="d-flex flex-column">
        <h2>Account info</h2>
        {user.admin || user.username === "exampleteacher" ? <></> : <div className="d-flex flex-column">
          <div>
            <label className="margin-small">check to confirm delete </label>
            <input onChange={(e)=>setDeleteAccount(e.target.checked)} className="margin-small" type="checkbox" name="delete" value={deleteAccount} />
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </div>
          <em className='red' >{deleteAccountError}</em>
        </div>}
        <div>
          <CreateNewClass setSelectedClass={setSelectedClass}/>
          <MyClasses setClassStudents={setClassStudents} setSelectedClass={setSelectedClass} />
          {selectedClass ? <SelectedClass selectedClass={selectedClass} classStudents={classStudents} setClassStudents={setClassStudents} /> : <></>}
        </div>
      </div>
    </div>
  )
}

export default TeacherAccount
