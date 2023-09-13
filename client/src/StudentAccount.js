import React, {useContext} from "react";
import MyContext from "./MyContext";

function StudentAccount(){
  const {user} = useContext(MyContext)
  return(
    <div>
      <div id="testCard" className="full  topMargins">
        <div className=" border d-flex flex-column">
          <h2>Account info</h2>
          <h3>Class name</h3>
          <em>{user.class_group.name}</em>
          <h3>Instructor</h3>
          <em>{user.teacher.last_name}</em>
          <h3>Test History</h3>
          <table>
            <thead>
              <tr>
                <th>Attempt</th>
                <th>Raw Score</th>
                <th>Estimated Characters recognized</th>
              </tr>
            </thead>
            <tbody>
              {user.scores.map((score, index)=>{
                return(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{score}</td>
                    <td>{score * 20}</td>
                  </tr>
                )}
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


export default StudentAccount
