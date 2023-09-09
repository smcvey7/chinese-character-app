import React, {useState, useContext, useEffect} from "react";
import MyContext from "./MyContext";
import { end } from "@popperjs/core";

function Testing({score, setScore, status, setStatus}){
  const {characters} = useContext(MyContext)
  const [charNum, setCharNum] = useState(0)
  const [testChars, setTestChars] = useState(null)
  const [numCorrect, setNumCorrect] = useState(0)
  const [correct, setCorrect] = useState(false)
  const [wrong, setWrong] = useState(0)

  useEffect(()=>{
    if (!characters){
      return
    }
    const filteredChars = []
    for (let i = 0; i < 150; i++){
      filteredChars.push(characters[i*20])
    }
    setTestChars(filteredChars)
  }, [characters])

  function createOptions(options){
    if (!testChars){
      return
    }
    const optionsArray = options.map((option, index)=>{
      return(
        <div key={option} className="form-check">
          <input onClick={handleChoice} type="radio" class="btn-check" name="options-outlined" value={index} id={`options${index+1}`} autocomplete="off" ></input>
          <label class="btn btn-outline-success" for={`options${index+1}`}>
            {option}
          </label>
        </div>
      )
    }
    )
    // randomize order of options
    for (let i = optionsArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = optionsArray[i]
      optionsArray[i] = optionsArray[j]
      optionsArray[j] = temp
    }
    return optionsArray
  }

  function handleChoice(e){
    if (e.target.value === "0"){
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    if (correct){
      setScore(score + 1)
      setWrong(0)
    }else{
      wrong === 4 ? endTest() : setWrong(wrong + 1)
    }

    nextChar()
  }

  function nextChar(){
    if (charNum < testChars.length - 1){
      setCharNum(charNum + 1)
    } else {
      endTest()
    }
  }

  function endTest(){
    setStatus("finished")
  }




  if (!testChars){
    return(<div></div>)
  }

  return(
    <div>
      <h1>TEST</h1>
      <h2 className="red">Wrong: {wrong}</h2>
      <div id="testCard" className="full  topMargins">
        <div className="center border d-flex flex-column">
        <h2 id="testChar"> {testChars[charNum].simplified}</h2>
          {/* <h2 id="testChar">{testChars[charNum].simplified}{testChars[charNum].traditional ? `(${testChars[charNum].traditional})` : ""}</h2> */}
          <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-around full card topMargins">
          <div className="d-flex flex-row justify-content-between">
            {createOptions(testChars[charNum].choices)}
            <div className="form-check">
              <input onClick={handleChoice} type="radio" class="btn-check" name="options-outlined" value={4} id={`options5`} autocomplete="off" ></input>
              <label class="btn btn-outline-success" for={`options5`}>
                I don't know
              </label>
            </div>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary topMargins full"></input>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Testing