import React, {useState} from "react";
import {v4 as uuidv4} from "uuid"
import StudentTests from "./StudentTests";
import SelectedTest from "./SelectedTest";

function Students({selectedClass, classStudents}){
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedTestNumber, setSelectedTestNumber] = useState("default")
  const [selectedTest, setSelectedTest] = useState(null)

  function viewStudentTests(e){
    e.preventDefault()
    setSelectedTest(null)
    setSelectedTestNumber("default")
    const studentId = e.target.parentElement.parentElement.getAttribute("value")
    const student = classStudents.filter((student)=>{
      return student.id === parseInt(studentId)
    })[0]
    console.log(student)

    setSelectedStudent(student)
    scrollToInfo()
  }

  function exportTableToCSV(filename, tableName){
    const csv = []
    const rows = document.querySelectorAll(`table.${tableName} tr.${tableName}`)
    for (const row of rows){
      const cols = row.querySelectorAll(`td.${tableName}, th.${tableName}`)
      const rowArray = []
      for (const col of cols){
        rowArray.push(`"${col.innerText}"`)
      }
      csv.push(rowArray.join(","))
    }
    downloadCSV(csv.join("\n"), filename)
  }

  function downloadCSV(csv, filename){
    const csvFile = new Blob([csv], {type: "text/csv"})
    const downloadLink = document.createElement("a")
    downloadLink.download = filename
    downloadLink.href = window.URL.createObjectURL(csvFile)
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
    downloadLink.click()
  }

  function scrollToInfo(){
    const moreInfo = document.getElementById("selectedStudent")

    moreInfo.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  function formatDate(timestamp){
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}/${month}/${day}`
  }

  return(
    <div>
      <h4>Students</h4>
      <div>
        <button onClick={()=>exportTableToCSV(`${selectedClass.name}-studentInfo.csv`, "classInfo")}>Download csv file</button>
        <table id="studentInfo" className="classInfo">
          <thead>
            <tr className="classInfo">
              <th className="classInfo">Last name</th>
              <th className="classInfo">First name</th>
              <th className="classInfo">Attempts</th>
              <th className="classInfo">Highest score</th>
              <th className="classInfo">First Language</th>
              <th className="classInfo">Other L2</th>
              <th className="classInfo">Chinese in class</th>
              <th className="classInfo">Chinese at home</th>
              <th className="classInfo">Age</th>
              <th className="classInfo">Country</th>
              <th className="classInfo">School</th>
              <th className="classInfo" >Other info</th>
              <th>Test details</th>
            </tr>
          </thead> 
          <tbody>
            {classStudents.map((student)=>{
              return(
                <tr key={uuidv4()} value={student.id} className="classInfo">
                  <td className="classInfo">{student.last_name}</td>
                  <td className="classInfo">{student.first_name}</td>
                  <td className="classInfo">{student.scores.filter((score)=> score !== 0).length}</td>
                  <td className="classInfo">{student.scores.length === 0 ? null :student.scores.length > 0 ? Math.max(...student.scores) : 0}</td>
                  <td className="classInfo">{student.first_language}</td>
                  <td className="classInfo">{student.other_L2}</td>
                  <td className="classInfo">{student.class_learning}</td>
                  <td className="classInfo">{student.home_learning}</td>
                  <td className="classInfo">{student.age}</td>
                  <td className="classInfo">{student.country}</td>
                  <td className="classInfo">{student.school}</td>
                  <td className="classInfo">{student.other_info}</td>
                  <td><button onClick={viewStudentTests}>view tests</button></td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
      <div id="selectedStudent" className="bottomMargins">
        {selectedStudent ?
          <div>
            <StudentTests formatDate={formatDate} selectedTestNumber={selectedTestNumber} selectedStudent={selectedStudent} setSelectedTest={setSelectedTest} setSelectedTestNumber={setSelectedTestNumber} />
            {selectedTest ? <SelectedTest date={formatDate(selectedTest.updated_at)} selectedTestNumber={selectedTestNumber} exportTableToCSV={exportTableToCSV} downloadCSV={exportTableToCSV} selectedClass={selectedClass} selectedTest={selectedTest} student={selectedStudent} /> : <></> }
          </div> : <></>}
      </div>
    </div>
  )
}

export default Students