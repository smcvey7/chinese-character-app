import React, {useState, useContext} from "react";
import {v4 as uuidv4} from "uuid"
import MyContext from "./MyContext";
import StudentTests from "./StudentTests";
import SelectedTest from "./SelectedTest";

function Students({selectedClass, classStudents}){
  const {user, characters} = useContext(MyContext) 
  const [studentTests, setStudentTests] = useState(null)
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
    const tests = user.tests.filter((test)=>{
      return test.student_id === student.id
    }
    )
    setStudentTests({
      student: student,
      tests: tests
    })
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

  function downloadCSV(csv, filename){
    const csvFile = new Blob([csv], {type: "text/csv"})
    const downloadLink = document.createElement("a")
    downloadLink.download = filename
    downloadLink.href = window.URL.createObjectURL(csvFile)
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
    downloadLink.click()
  }

  return(
    <div>
      <h4>Students</h4>
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
      </div>
      {studentTests ?
        <div>
          <StudentTests selectedTestNumber={selectedTestNumber} studentTests={studentTests} setSelectedTest={setSelectedTest} setSelectedTestNumber={setSelectedTestNumber} />
          {selectedTest ? <SelectedTest selectedTest={selectedTest} /> : <></> }
        </div> : <></>}
    </div>
  )
}

export default Students