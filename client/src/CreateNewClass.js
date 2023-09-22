import React, {useState, useContext} from "react";
import MyContext from "./MyContext";
import {v4 as uuidv4} from "uuid"

function CreateNewClass({setSelectedClass}){
  const {user, setUser} = useContext(MyContext)
  const [newClass, setNewClass] = useState({
    name: "",
    teacher_id: user.id,
    uuid: uuidv4()
  })

  function handleChange(e){
    const key = e.target.name
    const value = e.target.value
    setNewClass({
      ...newClass,
      [key]: value
    })
  }

  function createClass(e){
    e.preventDefault()
    fetch('/class_groups', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newClass)
    })
    .then((r)=>r.json())
    .then((data)=>{
      setUser({...user, class_groups: [...user.class_groups, data]})
      setNewClass({
        name: "",
        uuid: uuidv4(),
        teacher_id: user.id,
        level: ""
      })
      setSelectedClass({...data, students: []})
    })
  }

  return(
    <div className="d-flex flex-column card full topMargins">
            <h3>Create a new class</h3>
            <div>
              <form className="d-flex justify-content-around">
                <input name="name" value={newClass.name} onChange={handleChange} placeholder="class name"/>
                <button onClick={createClass}>Create new class</button>
              </form>
            </div>
          </div>
  )

}

export default CreateNewClass