import React from "react";
import {v4 as uuidv4} from "uuid";

function StudentTests({selectedStudent, setSelectedTest, setSelectedTestNumber, selectedTestNumber}){
  if (!selectedStudent){
    return(
      <div>
        <h4>Tests:</h4>
        <em>No tests found</em>
      </div>
    )
  }
  return(
    <div>
      <h4>Tests: {selectedStudent.last_name}, {selectedStudent.first_name}</h4>
        <select value={selectedTestNumber} onChange={(e)=>{
          setSelectedTest(selectedStudent.tests[e.target.value])
          setSelectedTestNumber(e.target.value)
          }}>
          <option value="default" disabled>select test</option>
          {selectedStudent.tests.map((test, index)=>{
            return(
              <option key={uuidv4()} value={index}>Test {index + 1} (score: {test.score})</option>
            )
          }
          )}
        </select>
    </div>
  )
}

export default StudentTests