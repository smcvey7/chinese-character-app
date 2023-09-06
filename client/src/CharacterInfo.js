import React from "react";

function CharacterInfo({currentCharacter, handleChange, handleAutofill}){
  return(
    <div className="topMargins full">
      <h1>Character: {currentCharacter.simplified}{currentCharacter.traditional === "" ? "" : ` / ${currentCharacter.traditional}`}</h1>
      {/* <button onClick={handleAutofill}>autofill</button><br/> */}
      <div className="card d-flex flex-column topMargins">
        <h3>Data:</h3>
        <label>HSK level:</label>
        <select onChange={handleChange} number="true" name="hsk_level" value={currentCharacter.hsk_level}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7-9</option>
      </select>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-column">
            <label>components:</label>
            <input className="short" onChange={handleChange} number="true" name="components" value={currentCharacter.components}/>
          </div>
          <div className="d-flex flex-column">
            <label>strokes:</label>
            <input className="short" onChange={handleChange} number="true" name="strokes" value={currentCharacter.strokes}/>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default CharacterInfo