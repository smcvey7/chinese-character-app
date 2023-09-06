import React from "react";

function MultipleChoiceEditor({currentCharacter, setCurrentCharacter}){

  function handleChangeChoices(e){
    const index = parseInt(e.target.name)
    const newChoices = currentCharacter.choices
    newChoices[index] = e.target.value

    setCurrentCharacter({
      ...currentCharacter,
      choices: newChoices
    })
  }

  return(
    <div className="card topMargins full">
      <h3>Multiple Choice</h3>
      <label>correct:</label>
      <input className="short"  onChange={handleChangeChoices} name="0" value={currentCharacter.choices[0]}/><br/>
      <label>incorrect:</label> 
      <div className="d-flex flex-row justify-content-around">
        <input className="short" onChange={handleChangeChoices} name="1" value={currentCharacter.choices[1]}/>
        <input className="short" onChange={handleChangeChoices} name="2" value={currentCharacter.choices[2]}/>
        <input className="short" onChange={handleChangeChoices} name="3" value={currentCharacter.choices[3]}/>
      </div>
    </div>
  )
}

export default MultipleChoiceEditor