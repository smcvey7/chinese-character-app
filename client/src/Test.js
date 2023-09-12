import React, {useState, useContext, useEffect} from "react";
import MyContext from "./MyContext";
import Testing from "./Testing";
import Finished from "./Finished";

function Test(){
  const [status, setStatus] = useState("instructions")
  const {user, currentTest, setCurrentTest} = useContext(MyContext)  
  const [newTest, setNewTest] = useState(null)
  const [finalScore, setFinalScore] = useState(null)

  useEffect(()=>{
    if (status === "testing"){
      return
    }
    if (!user){
      return
    }else if (user.tests.length === 0 || user.tests[user.tests.length - 1].complete === true){
      setNewTest(true)
      return
    }else if (user.tests[user.tests.length - 1].complete === false){
      setCurrentTest(user.tests[user.tests.length - 1])
      setNewTest(false)
    }else{
    }
  }, [user, newTest])

  function beginTest(){
    if (!currentTest){
      setNewTest(true)
      fetch('/tests', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({student_id: user.id, version: 1, score: 0, complete: false})
      })
      .then((r)=>r.json())
      .then((data)=>{
        setCurrentTest(data)
      })
    }
    setStatus("testing")
  }

  if (user && user.role !== "student"){
    return(
      <em>Tests are only available to students.</em>
    )
  }

  if (status === "instructions"){
    return(
      <div >
        <h1>Instructions</h1>
        <div className="full topMargins bottomMargins">
          <div id="instructionsCard" className="center border d-flex flex-column">
            <h2 id="testChar">Instructions</h2>
            <div className="text-start">
              <p>For each question of the test, you will be given one simplified character (with the traditional character in parenthesis) and four Chinese word options. Select the word option that demonstrates an accurate use of the Character and then choose Submit.</p>
              <p>For an accurate assessment of your character recognition, please do not reference any materials other than what you can recall on your own.</p>
              <ul>
                <li><p>If you are completely unsure of an answer, select "I don't know".</p></li>
                <li><p>If you recognize the character and simply can't decide which answer is correct, make your best guess after narrowing down the choices.</p></li>
              </ul>
              <p>If you answer incorrectly five times in a row, the test will end automatically, and you will be given your score with an estimate of how many Chinese characters you recognize.</p>
            </div>
            { currentTest ? currentTest.char_num === 0 ? <></> : <strong><em>You already have a test in progress. Click below to continue</em></strong> : <></>}
            <button onClick={beginTest} className="btn btn-primary topMargins full">{newTest === true ? "Begin Test" : "Continue Test"}</button>
          </div>
        </div>
      </div>
    )
  }else if (status === "testing"){
    return(<Testing setFinalScore={setFinalScore} currentTest={currentTest} setCurrentTest={setCurrentTest} status={status} setStatus={setStatus}/>)
  }else if (status === "finished"){
    return(
    <Finished finalScore={finalScore} currentTest={currentTest}/>
  )}
}

export default Test