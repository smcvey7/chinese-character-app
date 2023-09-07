import React, {useState} from "react";

function PinyinEditor({currentCharacter, setCurrentCharacter}){

  const [pinyinValue, setPinyinValue] = useState("")

  function removePinyin(e){
    const newPinyin = currentCharacter.pinyin.filter((word)=> word !== e.target.name)
    setCurrentCharacter({
      ...currentCharacter,
      pinyin: newPinyin
    })
  }
  
  function addPinyin(e){
    if (pinyinValue === "") return null
    e.preventDefault()
    setCurrentCharacter({
      ...currentCharacter,
      pinyin: [...currentCharacter.pinyin, pinyinValue]
    })
    setPinyinValue("")
  }
  return(
    <div className="card topMargins full">
      <div className="d-flex flex-column justify-content-around">
        <h3>Pinyin</h3>
        <div>
          <input onChange={(e)=>setPinyinValue(e.target.value)} name="pinyin" value={pinyinValue} />
          <button className="btn btn-secondary" onClick={addPinyin}>add</button>
        </div>
      </div>
        <ul className="d-flex flex-row">
          {currentCharacter.pinyin.map((word)=>{
            return <li key={word}>{word} <button className="btn btn-secondary" onClick={removePinyin} name={word}>x</button></li>
          })}
        </ul>
    </div>
  )
}

export default PinyinEditor