import React, {useContext} from "react";
import MyContext from "./MyContext";
import StudentAccount from "./StudentAccount";
import TeacherAccount from "./TeacherAccount";

function Account(){
const {user} = useContext(MyContext)

if (!user){
  return(
  <em>Please log in to view your account</em>
)}

if (user.role === "student"){
  return(
    <div>
      <StudentAccount/>
    </div>
  )
} else if (user.role === "teacher"){
  return(
    <div>
      <TeacherAccount/>
    </div>
  )}

}


export default Account