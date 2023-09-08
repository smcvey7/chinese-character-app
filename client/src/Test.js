import React, {useState, useContext, useEffect} from "react";
import MyContext from "./MyContext";

function Test(){
  const {characters} = useContext(MyContext)
  const [charNum, setCharNum] = useState(0)
  const [selection, setSelection] = useState("")
  const [testChars, setTestChars] = useState(null)
  const [correct, setCorrect] = useState(false)

  // const character1List = Object.keys(characterList.level1)

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
          <input onClick={(e)=>console.log(e.target.value)} type="radio" class="btn-check" name="options-outlined" value={index} id={`options${index}`} autocomplete="off" ></input>
          <label class="btn btn-outline-success" for={`options${index}`}>
            {option}
          </label>
        </div>
      )
    }
    )
    return optionsArray

  }

  if (!testChars){
    return(<div></div>)
  }

  return(
    <div>
      <h1>TEST</h1>
      <div id="testCard" className="full  topMargins">
        <div className="center border d-flex flex-column">
          <h2 id="testChar">{testChars[charNum].simplified}{testChars[charNum].traditional ? `(${testChars[charNum].traditional})` : ""}</h2>
          <form className="d-flex flex-row justify-content-around">
          {createOptions(testChars[charNum].choices)}
        </form>
        </div>
      </div>
    </div>
  )
}

export default Test