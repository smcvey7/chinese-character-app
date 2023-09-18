import React, {useContext} from "react";
import MyContext from "./MyContext";
import {v4 as uuidv4} from 'uuid';

function SelectedTest({selectedTest}){
  const {characters} = useContext(MyContext)
  
  return(
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
            {selectedTest.items.map((item)=>{
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
  )
}

export default SelectedTest