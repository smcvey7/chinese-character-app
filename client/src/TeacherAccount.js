import React, {useContext, useState, useEffect} from "react";
import MyContext from "./MyContext";
import CreateNewClass from "./CreateNewClass";
import MyClasses from "./MyClasses";
import SelectedClass from "./SelectedClass";

function TeacherAccount(){
  const {user} = useContext(MyContext)
  const [selectedClass, setSelectedClass] = useState(null)
  const [classStudents, setClassStudents] = useState([])
  
  useEffect(()=>{
    if (!selectedClass){
      return
    }
    console.log(classStudents)

  }, [selectedClass, user, classStudents])

  if (!user){
    return(
    <em>Please log in to view your account</em>
  )}
  
  return(
    <div className="full topMargins">
      <div className="d-flex flex-column">
        <h2>Account info</h2>
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
