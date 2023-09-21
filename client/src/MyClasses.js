import React, {useContext, useEffect} from "react";
import MyContext from "./MyContext";

function MyClasses({setSelectedClass, setClassStudents, selectedClass}){
  const {user} = useContext(MyContext)

  useEffect(()=>{
    if (!selectedClass){
      return
    }
    const students = selectedClass.students.filter((student)=>{
      return student.class_group_id === selectedClass.id
    })
    setClassStudents(students)
  }, [selectedClass, setClassStudents])

  function handleSelectClass(e){
    setClassStudents([])
    const selectedClass = user.class_groups.filter((class_group)=>{
      return class_group.id === parseInt(e.target.value)
    })[0]
    setSelectedClass(selectedClass)
  }
  return(
    <div className="topMargins">
      <h3>My classes</h3>
      <select defaultValue="default" value={selectedClass} onChange={handleSelectClass}>
        <option value="default" disabled>select class</option>
        {user.class_groups.map((class_group)=>{
          return(
            <option value={class_group.id} key={class_group.id}>{class_group.name}</option>
          )
        })}
      </select>
    </div>
  )
}

export default MyClasses