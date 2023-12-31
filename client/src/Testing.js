import React, {useState, useContext, useEffect} from "react";
import MyContext from "./MyContext";

function Testing({currentTest, setCurrentTest, setStatus, setFinalScore, status}){
  const {characters, user, setUser} = useContext(MyContext)
  const [charNum, setCharNum] = useState(0)
  const [testChars, setTestChars] = useState(null)
  const [wrong, setWrong] = useState(0)
  const [randomOptions, setRandomOptions] = useState(null)
  const [timer, setTimer] = useState(20)

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

  useEffect(()=>{
    if (timer === 0){
      console.log("out of time")
      handleSubmit({choice: "IDK", correct: false})
      setTimer(20)
    }

    if (status === "testing"){
      let timerId = setTimeout(()=>{
        setTimer(timer - 1)
      }, 1000)

      return ()=>clearTimeout(timerId)
    }
  }, [timer, status, setTimer, handleSubmit])



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
    for (let i = optionsArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = optionsArray[i]
      optionsArray[i] = optionsArray[j]
      optionsArray[j] = temp
    }
    optionsArray.push(
    <div key={charNum} className="form-check">
      <input onClick={handleChoice} type="radio" className="btn-check" name="options-outlined" choice="IDK" value={4} id={`options5`} autoComplete="off"defaultChecked={false}></input>
      <label className="btn btn-outline-success" htmlFor={`options5`}>I don't know</label>
    </div>
    )
    setRandomOptions(optionsArray)
    return optionsArray
  }

  function handleChoice(e){
    const currentItem = {
      character_id: testChars[charNum].id,
      choice: e.target.getAttribute("choice"),
      correct: e.target.value === "0" ? true : false
    }
    handleSubmit(currentItem)
  }

  function handleSubmit(currentItem){
    console.log("updating current test")
    setCurrentTest((prevTest) => ({
      ...prevTest,
      char_num: charNum + 1,
      score: prevTest.score + (currentItem.correct ? 1 : 0),
      items: [...prevTest.items, currentItem],
      complete: !currentItem.correct && wrong === 9,
    }));
  
    const testUpdate = {
      student_id: user.id,
      char_num: charNum + 1,
      score: currentTest.score + (currentItem.correct ? 1 : 0),
      items: [...currentTest.items, currentItem],
      complete: !currentItem.correct && wrong === 9,
      correct: currentItem.correct,
      char_id: testChars[charNum].id
    };

    if (currentItem.correct){
      setWrong(0)
    }else{
      if (wrong === 9){
        if (user.role === "student"){
          updateStudentScores(currentTest.score)
        }
        endTest()
      }else{
        setWrong(wrong + 1)
      }
    }
    if (user.role === "student"){
      fetch(`/tests/${currentTest.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(testUpdate)
      })
      .then((r)=>r.json())
      .then((data)=>{
        setUser((prevUser)=>({...prevUser, tests: [...user.tests.slice(0, user.tests.length - 1), data]}))
        setCurrentTest(data)
      })
    }
    
    nextChar()
    setTimer(20)
  }

  function updateStudentScores(score){
    const updatedScores = [...user.scores, score]
    console.log("beginning student record update")
    fetch(`/students/${user.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        student_id: user.id,
        scores: updatedScores
      })
    })
    .then((r)=>r.json())
    .then((data)=>{
      console.log("finishing updating student scores", data)
      setUser(data)
    })
  }

  function nextChar(){
    setRandomOptions(null)
    if (charNum < testChars.length - 1){
      setCharNum(charNum + 1)
    } else {
      endTest()
    }
  }

  function endTest(){
    console.log("ending test")
    setStatus("finished")
    setCharNum(0)
    setWrong(0)
    setFinalScore(currentTest.score)
    setCurrentTest(null)
  }

  if (!testChars || !testChars[charNum]){
    return(<div></div>)
  }

  return(
    <div>
      <h1>TEST</h1>
      {/* <h2 className="red">Wrong: {wrong}</h2>
      <h2 className="green">Score: {currentTest.score}</h2>
      <h2 className="red">Timer: {timer}</h2> */}
      <div id="testCard" className="full  topMargins">
        <div className="center border d-flex flex-column">
        <h2 id="testChar"> {testChars[charNum].simplified} {testChars[charNum].traditional ? `（${testChars[charNum].traditional}）` : ``}</h2>
          <form id="testForm" className="d-flex flex-column justify-content-around full card topMargins">
          <div className="d-flex flex-row justify-content-between">
            {randomOptions ? randomOptions : createOptions(testChars[charNum].choices)}
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Testing
