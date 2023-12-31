import React, {useState, useContext, useEffect} from "react";
import MyContext from "./MyContext";
import Testing from "./Testing";
import Finished from "./Finished";
import { useNavigate } from "react-router-dom";

function Test(){
  const [status, setStatus] = useState("instructions")
  const {user, setUser} = useContext(MyContext)  
  const [finalScore, setFinalScore] = useState(null)
  const [currentTest, setCurrentTest] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    if (!user){
      navigate("/getstarted")
      return <em>Please log in to access test</em>
    }else if (status === "testing"){
      return
    }
  }, [user, navigate, status])

  function handleBeginTest(){
    if (user.role === "teacher"){
      beginTestTeacher()
    }else{
      beginTest()
    }
  }

  function beginTestTeacher(){
    const testVersion = Math.floor(Math.random() * 1) + 1
    setCurrentTest({
      version: testVersion,
      score: 0,
      complete: false,
      char_num: 0,
      items: []
    })
    setStatus("testing")
  }

  function beginTest(){
    const testVersion = Math.floor(Math.random() * 1) + 1
    fetch('/tests', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({student_id: user.id, version: testVersion, score: 0, complete: false, char_num: 0})
    })
    .then((r)=>r.json())
    .then((data)=>{
      setUser({...user, tests: [...user.tests, data]})
      setCurrentTest(data)
    })

    setStatus("testing")
  }

  if (status === "instructions"){
    return(
      <div id="testComponent" >
        <h1>Character Test</h1>
        <div className="full topMargins bottomMargins">
          <div id="instructionsCard" className="center border d-flex flex-column">
            <h2 id="testChar">Instructions</h2>
            <div className="text-start">
              <p>For each question of the test, you will be given one simplified character (with the traditional character in parenthesis) and four Chinese word options. Select the word option that demonstrates an accurate use of the Character.</p>
              <p><strong>You will have 20 seconds to select an answer.</strong> If you haven't chosen an answer within the time limit, the test will automatically progress to the next question.</p>
              <p>For an accurate assessment of your character recognition, please do not reference any materials other than what you can recall on your own.</p>
              <ul>
                <li><p>If you are completely unsure of an answer, select "I don't know".</p></li>
                <li><p>If you recognize the character and simply can't decide which answer is correct, make your best guess after narrowing down the choices.</p></li>
              </ul>
              <p>If you answer incorrectly ten times in a row, the test will end automatically, and you will be given your score with an estimate of how many Chinese characters you recognize.</p>
            </div>
            <button onClick={handleBeginTest} className="btn btn-primary topMargins full">Begin Test</button>
          </div>
        </div>
      </div>
    )
  }else if (status === "testing"){
    return(<Testing status={status} setFinalScore={setFinalScore} currentTest={currentTest} setCurrentTest={setCurrentTest} setStatus={setStatus}/>)
  }else if (status === "finished"){
    return(
    <Finished finalScore={finalScore} currentTest={currentTest}/>
  )}
}

export default Test