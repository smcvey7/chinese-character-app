import React, {useState, useContext, useEffect} from "react";
import MyContext from "./MyContext";

function Testing({currentTest, setCurrentTest, setStatus}){
  const {characters} = useContext(MyContext)
  const [charNum, setCharNum] = useState(0)
  const [testChars, setTestChars] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [wrong, setWrong] = useState(0)
  const [randomOptions, setRandomOptions] = useState(null)
  const [errors, setErrors] = useState(null)

  useEffect(()=>{
    if (!characters || !currentTest){
      return
    }
    const filteredChars = []
    for (let i = 0; i < 150; i++){
      filteredChars.push(characters[i*20 + currentTest.version - 1])
    }
    setTestChars(filteredChars)
    setCharNum(currentTest.char_num)
  }, [characters, currentTest])

  function createOptions(options){
    if (!testChars){
      return
    }
    const optionsArray = options.map((option, index)=>{
      return(
        <div key={option} className="form-check">
          <input onClick={handleChoice} type="radio" className="btn-check" name="options-outlined" choice={option} value={index} id={`options${index+1}`} autoComplete="off" ></input>
          <label className="btn btn-outline-success" htmlFor={`options${index+1}`}>
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
    setRandomOptions(optionsArray)
    return optionsArray
  }

  function handleChoice(e){
    if (e.target.value === "0"){
      setCurrentItem({correct: true, choice: e.target.getAttribute("choice")})
    } else {
      setCurrentItem({correct: false, choice: e.target.getAttribute("choice")})
    }
  }

  function handleSubmit(e){
    e.preventDefault()

    if (!currentItem){
      setErrors("please select an answer")
      return
    }

    const testUpdate = currentItem.correct ? {...currentTest, char_num: charNum + 1, score: currentTest.score + 1} : {...currentTest, char_num: charNum + 1}
    
    if (currentItem.correct){
      setWrong(0)
    }else{
      if (wrong === 9){
        testUpdate.complete = true
        endTest()
      }else{
        setWrong(wrong + 1)
      }
    }

    fetch(`/tests/${currentTest.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(testUpdate)
    })
    .then((r)=>r.json())
    .then((data)=>{
      console.log(data)
      setCurrentTest(data)
    })


    nextChar()
  }

  function nextChar(){
    console.log("number", charNum)
    setRandomOptions(null)
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
            {randomOptions ? randomOptions : createOptions(testChars[charNum].choices)}
            <div className="form-check">
              <input onClick={handleChoice} type="radio" className="btn-check" name="options-outlined" value={4} id={`options5`} autoComplete="off" ></input>
              <label className="btn btn-outline-success" htmlFor={`options5`}>
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