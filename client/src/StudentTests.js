import React from "react";
import {v4 as uuidv4} from "uuid";

function StudentTests({studentTests, setSelectedTest, setSelectedTestNumber, selectedTestNumber}){
  return(
    <div>
      <h4>Tests: {studentTests.student.last_name}, {studentTests.student.first_name}</h4>
        <select value={selectedTestNumber} onChange={(e)=>{
          setSelectedTest(studentTests.tests[e.target.value])
          setSelectedTestNumber(e.target.value)
          }}>
          <option value="default" disabled>select test</option>
          {studentTests.tests.map((test, index)=>{
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