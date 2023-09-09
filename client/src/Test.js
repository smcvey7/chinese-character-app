import React, {useState, useContext, useEffect} from "react";
import MyContext from "./MyContext";
import Testing from "./Testing";
import Finished from "./Finished";

function Test(){
  const {characters} = useContext(MyContext)
  const [charNum, setCharNum] = useState(0)
  const [testChars, setTestChars] = useState(null)
  const [correct, setCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [status, setStatus] = useState("instructions")

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
            <button onClick={()=>setStatus("testing")} className="btn btn-primary topMargins full">Begin Test</button>
          </div>
        </div>
      </div>
    )
  }else if (status === "testing"){
    return(<Testing score={score} setScore={setScore} status={status} setStatus={setStatus}/>)
  }else if (status === "finished"){
    return(
    <Finished score={score}/>
  )}
}

export default Test