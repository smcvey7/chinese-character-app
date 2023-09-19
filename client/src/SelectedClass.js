import React, {useEffect, useContext} from "react"
import QRCode from "qrcode";
import Students from "./Students";
import MyContext from "./MyContext";

function SelectedClass({selectedClass, setClassStudents, classStudents}){
  const {user, setUser} = useContext(MyContext)
  
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

    QRCode.toCanvas(canvas, `https://chinese-character-app.onrender.com/getstarted?class_id=${selectedClass.uuid}`, {width: 300, height: 300},
    () => {
      canvas.style.width = `300px`
      canvas.style.height = `300px`
    })
    ctx.font = "15px Arial";
    ctx.fillText(selectedClass.uuid, 10, 300);
  }, [selectedClass, setClassStudents])

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

  function handleDownload(e){
    e.preventDefault()
    const canvas = document.getElementById("canvas")
    const image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream")
    const link = document.createElement("a")
    link.download = `${selectedClass.name}-QRcode.png`
    link.href = image
    link.click()
  }

  function copyCode(){
    const code = document.querySelector("input#classCode")
    if (!navigator.clipboard){
      code.select()
      document.execCommand("copy")
    } else{
        code.select()
        navigator.clipboard.writeText(code.value)
    }  
  }

  function selectAll(e){
    e.target.select()
  }

  return(
    <div>
            <div className="card">
              <div className="d-flex flex-row justify-content-between">
                <h3>Class info</h3>
                <h4>{selectedClass.name}</h4>
                <button onClick={handleDelete}>Delete class</button>
              </div>
              <div className="d-flex flex-column qr-card">
                <h4>Class id</h4>
                <canvas id="canvas">
                </canvas><br/>
                <button onClick={handleDownload}>Download</button>

                <strong className="margins"><em>Students can scan this QR code to join your class or use this link:</em></strong>
                <div className="d-flex flex-column">
                  <input onClick={selectAll} id="classCode" value={`https://chinese-character-app.onrender.com/getstarted?class_id=${selectedClass.uuid}`} readOnly/>
                  <button className="smallButton" onClick={copyCode}>Copy</button>
                </div>
              </div>
              
            </div>
            {classStudents.length === 0 ? <em>No students</em> : <Students setClassStudents={setClassStudents} selectedClass={selectedClass} classStudents={classStudents}/>}
          </div>
  )
}

export default SelectedClass