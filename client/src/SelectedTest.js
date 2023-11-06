import React, {useContext} from "react";
import MyContext from "./MyContext";
import {v4 as uuidv4} from 'uuid';
import excel4node from "excel4node";

function SelectedTest({selectedTest, selectedClass, student, exportTableToCSV, selectedTestNumber, date}){
  const {characters} = useContext(MyContext)

  // testing this out

  function downloadExcel(file, filename){
    const excelFile = new Blob([file], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"})
    const downloadLink = document.createElement("a")
    downloadLink.download = filename
    downloadLink.href = window.URL.createObjectURL(excelFile)
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
    downloadLink.click()
  }

  function exportTableToExcel(){
    const table = document.getElementById("selected-test-2");
    const thead = table.children[1]
    const tbody = table.children[2]
   
    const wb = new excel4node.Workbook();
    const ws = wb.addWorksheet('Sheet 1');
    const style = wb.createStyle({
      font: {
        color: '#000000',
        size: 12,
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    for (let i = 0; i < 5; i++){
      ws.cell(1, i+1).string(thead.children[0].children[i].innerHTML).style(style)
    }

    // wb.write('Excel.xlsx');
    
    const url = window.URL.createObjectURL(new Blob([wb], 
      {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));

      const link = document.createElement('a');
   
      link.href = url;
      link.setAttribute('download', "test.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

  }
  

  // to here
  
  return(
    <div>
      <button onClick={()=>exportTableToCSV(`${selectedClass.name}-${student.last_name}-test${selectedTestNumber+1}-${date}.csv`, "studentInfo")}>Download csv file</button>
      <button onClick={()=>exportTableToExcel()}>Download excel file</button>
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



    <table id="selected-test-2" className="studentInfo">
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