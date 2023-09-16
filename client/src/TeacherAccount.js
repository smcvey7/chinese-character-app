import React, {useContext, useState, useEffect} from "react";
import MyContext from "./MyContext";
import { v4 as uuidv4 } from 'uuid';
import QRCode from "qrcode";


function TeacherAccount(){
  const {user, setUser, characters} = useContext(MyContext)
  const [newClass, setNewClass] = useState({
    name: "",
    teacher_id: user.id,
    uuid: uuidv4()
  })
  const [selectedClass, setSelectedClass] = useState(null)
  const [classStudents, setClassStudents] = useState([])
  const [studentTests, setStudentTests] = useState(null)
  const [currentTest, setCurrentTest] = useState("default")


  useEffect(()=>{
    if (!selectedClass){
      return
    }
    const students = selectedClass.students.filter((student)=>{
      return student.class_group_id === selectedClass.id
    })
    setClassStudents(students)

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext("2d");

    // include QRcode with class id below it in canvas
   
    QRCode.toCanvas(canvas, `https://chinese-character-app.onrender.com/getstarted?class_id=${selectedClass.uuid}`, {width: 300, height: 300},
    () => {
      canvas.style.width = `300px`
      canvas.style.height = `300px`
    })
    ctx.font = "15px Arial";
    ctx.fillText(selectedClass.uuid, 10, 300);


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
  }

  // download table with id studentInfo as csv
  function downloadCSV(csv, filename){
    const csvFile = new Blob([csv], {type: "text/csv"})
    const downloadLink = document.createElement("a")
    downloadLink.download = filename
    downloadLink.href = window.URL.createObjectURL(csvFile)
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
    downloadLink.click()
  }

  function exportTableToCSV(filename){
    const csv = []
    const rows = document.querySelectorAll("table tr")
    for (const row of rows){
      const cols = row.querySelectorAll("td, th")
      const rowArray = []
      for (const col of cols){
        rowArray.push(col.innerText)
      }
      csv.push(rowArray.join(","))
    }
    downloadCSV(csv.join("\n"), filename)
  }

  function viewStudentTests(e){
    e.preventDefault()
    const studentId = e.target.parentElement.parentElement.getAttribute("value")
    const student = classStudents.filter((student)=>{
      return student.id === parseInt(studentId)
    })[0]
    const tests = user.tests.filter((test)=>{
      return test.student_id === student.id
    }
    )
    console.log(student, tests)

    setStudentTests({
      student: student,
      tests: tests
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
      <div className="d-flex flex-column">
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
          <div>
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
              
            </div>
            <div>
                <button onClick={()=>exportTableToCSV("studentInfo.csv")}>Download excel file</button>
                <h4>Students</h4>
                <table id="studentInfo">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Attempts</th>
                      <th>Highest score</th>
                      <th>First Language</th>
                      <th>Other L2</th>
                      <th>Chinese in class</th>
                      <th>Chinese at home</th>
                      <th>Age</th>
                      <th>Country</th>
                      <th>School</th>
                      <th>Other info</th>
                      <th>Test details</th>
                    </tr>
                  </thead> 
                  <tbody>
                    {classStudents.map((student)=>{
                      return(
                        <tr key={uuidv4()} value={student.id}>
                          <td>{student.last_name}, {student.first_name}</td>
                          <td>{student.scores.length}</td>
                          <td>{student.scores.length === 0 ? null :student.scores.length > 0 ? Math.max(...student.scores) : 0}</td>
                          <td>{student.first_language}</td>
                          <td>{student.other_L2s}</td>
                          <td>{student.class_learning}</td>
                          <td>{student.home_learning}</td>
                          <td>{student.age}</td>
                          <td>{student.country}</td>
                          <td>{student.school}</td>
                          <td>{student.other_info}</td>
                          <td><button onClick={viewStudentTests}>view tests</button></td>
                        </tr>
                      )
                    }
                    )}
                  </tbody>
                </table>
              </div>
          </div> : <></>}
          {studentTests ?
            <div>
              <h4>Tests: {studentTests.student.last_name}, {studentTests.student.first_name}</h4>
              <select value={currentTest} onChange={(e)=>setCurrentTest(studentTests.tests[e.target.value])}>
                <option value="default" disabled>select test</option>
                {studentTests.tests.map((test, index)=>{
                  return(
                    <option key={test.id} value={index}>Test {index + 1} (score: {test.score})</option>
                  )
                }
                )}
              </select>
              {currentTest !== "default" ?
              <table>
                <thead>
                  <tr>
                    <th>Character ID</th>
                    <th>Character</th>
                    <th>Correct</th>
                    <th>Choice</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTest.items.map((item)=>{
                    return(
                      <tr key={item.id}>
                        <td>{item.character_id}</td>
                        <td>{characters[item.character_id].simplified}</td>
                        <td>{item.correct ? "correct" : "incorrect"}</td>
                        <td>{item.choice}</td>
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </table>
              : <></>}
            </div> : <></>}
          
        </div>
        
      </div>
    </div>
  )
}

export default TeacherAccount
