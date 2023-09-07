import React, {useState} from "react";

function CharacterFilter({characterList, setCurrentCharacter, currentCharacter, setFilteredList, filteredList}){

  const [currentLevel, setCurrentLevel] = useState(1)

  function handleLevelChange(e){
    const level = parseInt(e.target.value)
    setCurrentLevel(level)
    filterCharacters(level)
    // setCurrentCharacter(filterCharacters[0])
  }
  
  function filterCharacters(level){
    const newList = characterList.filter((char)=>{
      return char.hsk_level === level
    }).sort((a, b)=>{
      return a.id-b.id
    })
  
    setFilteredList(newList)
    setCurrentCharacter(newList[0])
  }

  return(
    <div id="characterFilter" className="d-flex flex-column topMargins justify-content-around">
        <div className="d-flex flex-row justify-content-between">
          <label>Level:</label>
          <select value={currentLevel} onChange={handleLevelChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7-9</option>
          </select>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <label>Character:</label>
          <select value={currentCharacter.id} name="characters" onChange={(e)=>setCurrentCharacter(characterList.filter((char)=>char.id===parseInt(e.target.value))[0])}>
                {filteredList.map((char)=>{
                  return <option key={char.simplified} value={char.id}>{`${char.id} ${char.simplified} (${char.checked?"checked":"not checked"})`}</option>
                })}
          </select>
        </div>
        {/* <button onClick={preloadAll}>Preload all</button> */}
      </div>
  )
}

export default CharacterFilter