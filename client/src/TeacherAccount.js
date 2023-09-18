import React, {useContext, useState, useEffect} from "react";
import MyContext from "./MyContext";
import { v4 as uuidv4 } from 'uuid';
import QRCode from "qrcode";
import CreateNewClass from "./CreateNewClass";


function TeacherAccount(){
  const {user, setUser, characters} = useContext(MyContext)
  
  const [selectedClass, setSelectedClass] = useState(null)
  const [classStudents, setClassStudents] = useState([])
  const [studentTests, setStudentTests] = useState(null)
  const [currentTestNumber, setCurrentTestNumber] = useState("default")
  const [currentTest, setCurrentTest] = useState(null)


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

  function handleSelectClass(e){
    setClassStudents([])
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
    const rows = document.querySelectorAll("table.classInfo tr.classInfo")
    for (const row of rows){
      const cols = row.querySelectorAll("td.classInfo, th.classInfo")
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
    setStudentTests({
      student: student,
      tests: tests
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
    <div className="full topMargins">
      <div className="d-flex flex-column">
        <h2>Account info</h2>
        <div>
          <CreateNewClass/>
          <div className="topMargins">
            <h3>My classes</h3>
            <select defaultValue="default" onChange={handleSelectClass}>
              <option value="default" disabled>select class</option>
              {user.class_groups.map((class_group)=>{
                return(
                  <option value={class_group.id} key={class_group.id}>{class_group.name}</option>
                )
              })}
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
                <h4>Students</h4>
                {classStudents.length === 0 ? <em>No students</em> :
                <div>
                  <button onClick={()=>exportTableToCSV(`${selectedClass.name}-studentInfo.csv`)}>Download csv file</button>
                  <table id="studentInfo" className="classInfo">
                    <thead>
                      <tr className="classInfo">
                        <th className="classInfo">First name</th>
                        <th className="classInfo">Last name</th>
                        <th className="classInfo">Attempts</th>
                        <th className="classInfo">Highest score</th>
                        <th className="classInfo">First Language</th>
                        <th className="classInfo">Other L2</th>
                        <th className="classInfo">Chinese in class</th>
                        <th className="classInfo">Chinese at home</th>
                        <th className="classInfo">Age</th>
                        <th className="classInfo">Country</th>
                        <th className="classInfo">School</th>
                        <th className="classInfo">Other info</th>
                        <th className="classInfo">Test details</th>
                      </tr>
                    </thead> 
                    <tbody>
                      {classStudents.map((student)=>{
                        return(
                          <tr key={uuidv4()} value={student.id} className="classInfo">
                            <td className="classInfo">{student.last_name}</td>
                            <td className="classInfo">{student.first_name}</td>
                            <td className="classInfo">{student.scores.length}</td>
                            <td className="classInfo">{student.scores.length === 0 ? null :student.scores.length > 0 ? Math.max(...student.scores) : 0}</td>
                            <td className="classInfo">{student.first_language}</td>
                            <td className="classInfo">{student.other_L2s}</td>
                            <td className="classInfo">{student.class_learning}</td>
                            <td className="classInfo">{student.home_learning}</td>
                            <td className="classInfo">{student.age}</td>
                            <td className="classInfo">{student.country}</td>
                            <td className="classInfo">{student.school}</td>
                            <td className="classInfo">{student.other_info}</td>
                            <td className="classInfo"><button onClick={viewStudentTests}>view tests</button></td>
                          </tr>
                        )
                      }
                      )}
                    </tbody>
                  </table>
                </div>}
              </div>
          </div> : <></>}
          {studentTests ?
            <div>
              <h4>Tests: {studentTests.student.last_name}, {studentTests.student.first_name}</h4>
              <select value={currentTestNumber} onChange={(e)=>{
                setCurrentTest(studentTests.tests[e.target.value])
                setCurrentTestNumber(e.target.value)
                }}>
                <option value="default" disabled>select test</option>
                {studentTests.tests.map((test, index)=>{
                  return(
                    <option key={uuidv4()} value={index}>Test {index + 1} (score: {test.score})</option>
                  )
                }
                )}
              </select>
              {currentTest ?
              <table className="studentInfo">
                <thead>
                  <tr className="studentInfo">
                    <th className="studentInfo">Character ID</th>
                    <th className="studentInfo">Character</th>
                    <th className="studentInfo">Correct</th>
                    <th className="studentInfo">Choice</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTest.items.map((item)=>{
                    return(
                      <tr key={uuidv4()} className="studentInfo">
                        <td className="studentInfo">{item.character_id}</td>
                        <td className="studentInfo">{characters[item.character_id-1].simplified}</td>
                        <td className="studentInfo">{item.correct ? "correct" : "incorrect"}</td>
                        <td className="studentInfo">{item.choice}</td> 
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
