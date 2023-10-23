import React, {useContext} from "react";
import MyContext from "./MyContext";
import {v4 as uuidv4} from 'uuid';

function SelectedTest({selectedTest, selectedClass, student, exportTableToCSV, downloadCSV, selectedTestNumber}){
  const {characters} = useContext(MyContext)
  
  return(
    <div>
      <button onClick={()=>exportTableToCSV(`${selectedClass.name}-${student.last_name}-test${selectedTestNumber+1}.csv`, "studentInfo")}>Download csv file</button>
      <table id="selected-test" className="studentInfo">
      <caption><strong>class: </strong>{selectedClass.name}<strong> student: </strong> {student.last_name}, {student.first_name[0]}<strong> score: </strong>{selectedTest.score}<strong> test version </strong>{selectedTest.version}</caption>
      <thead>
        <tr className="studentInfo">
          <th className="studentInfo">Character ID</th>
          <th className="studentInfo">Character</th>
          <th className="studentInfo">Student selection</th>
          <th className="studentInfo">Correct</th>
          <th className="studentInfo">Correct option</th>
          <th className="studentInfo" colSpan="4">Incorrect options</th>
        </tr>
      </thead>
      <tbody>
        {selectedTest.items.map((item)=>{
          const character = characters[item.character_id-1]
          return(
            <tr key={uuidv4()} className="studentInfo">
              <td className="studentInfo">{item.character_id}</td>
              <td className="studentInfo">{character.simplified}</td>
              <td className="studentInfo">{item.choice}</td>
              <td className="studentInfo">{item.correct ? "correct" : "incorrect"}</td>
              <td className={item.choice === character.choices[0] ? "bold studentInfo green-background studentInfo" : "studentInfo" } value={character.choices[0]} >{character.choices[0]}</td>
              <td className={item.choice === character.choices[1] ? "bold studentInfo red-background studentInfo" : "studentInfo" } value={character.choices[1]} >{character.choices[1]}</td>
              <td className={item.choice === character.choices[2] ? "bold studentInfo red-background studentInfo" : "studentInfo" } value={character.choices[2]} >{character.choices[2]}</td>
              <td className={item.choice === character.choices[3] ? "bold studentInfo red-background studentInfo" : "studentInfo" } value={character.choices[3]} >{character.choices[3]}</td>
              <td className={item.choice === "IDK" ? "bold studentInfo red-background studentInfo" : "studentInfo" } value="IDK" >IDK</td>

            </tr>
          )
        }
        )}
      </tbody>
    </table>
    </div>
    
  )
}

export default SelectedTest