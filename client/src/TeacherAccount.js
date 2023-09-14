import React, {useContext, useState, useEffect} from "react";
import MyContext from "./MyContext";
import { v4 as uuidv4 } from 'uuid';
import QRCode from "qrcode";


function TeacherAccount(){
  const {user, setUser} = useContext(MyContext)
  const [newClass, setNewClass] = useState({
    name: "",
    teacher_id: user.id,
    uuid: uuidv4()
  })
  const [selectedClass, setSelectedClass] = useState(null)
  const [classStudents, setClassStudents] = useState([])


  useEffect(()=>{
    if (!selectedClass){
      return
    }
    const students = selectedClass.students.filter((student)=>{
      return student.class_group_id === selectedClass.id
    })
    setClassStudents(students)
   
    QRCode.toCanvas(document.getElementById('canvas'), `https://chinese-character-app.onrender.com/getstarted?class_id=${selectedClass.uuid}`, function (error) {
      if (error) console.error(error)
      console.log('success!');
    })
  }, [selectedClass, user])

  function handleDownload(e){
    e.preventDefault()
    const canvas = document.getElementById("canvas")
    const image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream")
    const link = document.createElement("a")
    link.download = `${selectedClass.name}-QRcode.png`
    link.href = image
    link.click()
  }

  function handleChange(e){
    const key = e.target.name
    const value = e.target.value
    setNewClass({
      ...newClass,
      [key]: value
    })
  }

  function handleSelectClass(e){

    const selectedClass = user.class_groups.filter((class_group)=>{
      return class_group.id === parseInt(e.target.value)
    })[0]
    setSelectedClass(selectedClass)
    console.log(selectedClass)

    // fetch(`/class_groups/${e.target.value}`)
    // .then((r)=>r.json())
    // .then((data)=>{
    //   console.log(data)
    //   setSelectedClass(data)
    // })
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
    })
  }

  function handleDelete(e){
    e.preventDefault()
    fetch(`/class_groups/${selectedClass.id}`, {
      method: "DELETE"
    })
    const updatedClassGroups = user.class_groups.filter((class_group)=>{
      return class_group.id !== selectedClass.id
    })
    setUser({...user, class_groups: updatedClassGroups})
  }

  if (!user){
    return(
    <em>Please log in to view your account</em>
  )}
  
  return(
    <div className="full  topMargins">
      <div className="  d-flex flex-column">
        <h2>Account info</h2>
        <div>
          <div className="d-flex flex-column card full topMargins">
            <h3>Create a new class</h3>
            <div>
              <form className="d-flex justify-content-around">
                <input name="name" value={newClass.name} onChange={handleChange} placeholder="class name"/>
                <button onClick={createClass}>Create new class</button>
              </form>
            </div>
          </div>
          <div className="topMargins">
            <h3>My classes</h3>
            <select defaultValue="default" onChange={handleSelectClass}>
              <option value="default" disabled>select class</option>
              {user.class_groups.map((class_group)=>{
                return(
                  <option value={class_group.id} key={class_group.id}>{class_group.name}</option>
                )
              }
              )}
            </select>
          </div>
          {selectedClass ?
          <div className="card">
            <div className="d-flex flex-row justify-content-between">
              <h3>Class info</h3>
              <h4>{selectedClass.name}</h4>
              <button onClick={handleDelete}>Delete class</button>
            </div>
            <div className="d-flex flex-column qr-card">
              <h4>QR Code</h4>
              <button onClick={handleDownload}>Download</button>
              <canvas id="canvas">
              </canvas><br/>
            </div>
            <div>
              <h4>Students</h4>
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Attempts</th>
                    <th>Highest score</th>
                  </tr>
                </thead> 
                <tbody>
                  {classStudents.map((student)=>{
                    return(
                      <tr key={uuidv4()}>
                        <td>{student.first_name} {student.last_name}</td>
                        <td>{student.scores.length}</td>
                        <td>{student.scores.length === 0 ? null :student.scores.length > 0 ? Math.max(...student.scores) : 0}</td>
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </table>
              <ul>
                {classStudents.map((student)=>{
                  return(
                    <li key={uuidv4()}>{student.first_name} {student.last_name}</li>
                  )
                }
                )}
              </ul>
            </div>
          </div> : <></>}
          
        </div>
        
      </div>
    </div>
  )
}

export default TeacherAccount
