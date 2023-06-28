import React, {useEffect, useState} from "react";
const {set} = require('lodash.set')
var _ = require('lodash')

function CharacterEditor(){
  const [characterList, setCharacterList] =  useState(null)
  const [currentCharacter, setCurrentCharacter] = useState(null)
  const [pinyinValue, setPinyinValue] = useState("")
  const [currentLevel, setCurrentLevel] = useState(1)
  const [filteredList, setFilteredList] = useState(null)
  const [data, setData] = useState([])



  const getData=()=>{
    fetch ('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((r)=>r.json())
    .then((data)=>setData(data))
  }
  
  useEffect(()=>{
    fetch('/characters').then((r)=>r.json()).then((chars)=>{
      setFilteredList(chars.filter((char)=>char.hsk_level === 1).sort((a, b)=>{return a.id-b.id}))
      setCharacterList(chars.sort((a, b)=>{return a.id-b.id}))
      setCurrentCharacter(chars[0])
    })
    getData()
  }, [])


  function handleChange(e){
    const value = e.target.getAttribute("number")==="true" ? e.target.value==="" ? "" : parseInt(e.target.value) : e.target.value

    // set(update, e.target.name, value);

    setCurrentCharacter({
      ...currentCharacter,
      [e.target.name]: value
    })
  }

  function handleChangeChoices(e){
    const index = parseInt(e.target.name)
    const newChoices = currentCharacter.choices
    newChoices[index] = e.target.value

    setCurrentCharacter({
      ...currentCharacter,
      choices: newChoices
    })
  }

function removePinyin(e){
  const newPinyin = currentCharacter.pinyin.filter((word)=> word !== e.target.name)
  setCurrentCharacter({
    ...currentCharacter,
    pinyin: newPinyin
  })
}

function nextPrevious(e){
  e.preventDefault()
  const nextChar = characterList.filter((char)=>char.id===currentCharacter.id + parseInt(e.target.value))[0]

  // if (degree === 1 && currentCharacter.)
  if (nextChar) setCurrentCharacter(nextChar)
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

function handleAutofill(e){
  e.preventDefault()
  fetch(`https://api.ctext.org/getcharacter?char=${currentCharacter.simplified}`)
  .then((r)=>r.json())
  .then((data)=>autofillData(data))
}

function autofillData(autoData){
  const traditional = getTraditional(autoData)
  const strokes = autoData.totalstrokes
  const pinyin = autoData.readings.mandarinpinyin
 
  const choices = createFakes(autoData.char)

  setCurrentCharacter({
    ...currentCharacter,
    traditional: traditional,
    strokes: strokes,
    pinyin: pinyin, 
    choices: choices
  })
}

function createFakes(input){
  const dictData = data.filter((char)=>char.ci.includes(input))
  const wordList = dictData.map((word)=>{return word.ci})
  const items = _.sampleSize(characterList, 3).map((word)=>{return word.simplified})
  const fakes = [input, input, input].map((word, index)=>{
    const beforeOrAfter = Math.floor(Math.random()*2)
    if (beforeOrAfter === 0){
      return word+items[index]
    }else return items[index]+word
  })


  return [currentCharacter.choices[0], ...fakes]
}

function getTraditional(char){
  if (char.variants){
    const variants = char.variants.filter((char)=>char.relation === "kTraditionalVariant")
    if (variants.length !== 0){
      return variants[0].character
    }else return ""
  }else return ""
}

function handleSubmit(e){
  e.preventDefault()

  fetch(`/characters/${currentCharacter.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({...currentCharacter})
  }).then((r)=>r.json())
  .then((updatedChar)=>{
    const updatedList = characterList.map((char)=>{
      if (char.id === updatedChar.id){
        return updatedChar
      }else return char
    }).sort((a, b)=>{return a.id-b.id})
    setCharacterList(updatedList)
  })
}

function preloadAll(){
  const incomplete = characterList.filter((char)=>char.pinyin.length === 0)
  incomplete.forEach((char)=>{
    fetch(`https://api.ctext.org/getcharacter?char=${char.simplified}`)
    .then((r)=>r.json())
    .then((data)=>{
      const traditional = getTraditional(data)
      const strokes = data.totalstrokes
      const pinyin = data.readings.mandarinpinyin
      const updatedChar = {
        ...char,
        traditional: traditional,
        strokes: strokes,
        pinyin: pinyin
      }
      submitUpdate(updatedChar)
    })
})
}

function submitUpdate(updatedChar){
  fetch(`/characters/${updatedChar.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({...updatedChar})
  }).then((r)=>r.json())
  // .then((newChar)=>{
  //   // console.log("posted: ", newChar.simplified)
  // })
}

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

function handleComplete(e){
  setCurrentCharacter({
    ...currentCharacter,
    checked: e.target.checked
  })
}

  if (!currentCharacter) return <></>

  return(
    <div>
      <div>
        Level:
        <select value={currentLevel} onChange={handleLevelChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
        <select value={currentCharacter.id} className="topMargins" name="characters" onChange={(e)=>setCurrentCharacter(characterList.filter((char)=>char.id===parseInt(e.target.value))[0])}>
              {filteredList.map((char)=>{
                return <option key={char.simplified} value={char.id}>{`${char.simplified} (${char.checked?"checked":"not checked"})`}</option>
              })}
            </select>
        {/* <button onClick={preloadAll}>Preload all</button> */}
      </div>
      <div id="editorCard" className="full card topMargins">
        <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-around">
          <div>
            
            <h1>Character: {currentCharacter.simplified}{currentCharacter.traditional === "" ? "" : ` / ${currentCharacter.traditional}`}</h1><button onClick={handleAutofill}>autofill</button><br/>
            HSK level:<select onChange={handleChange} number="true" name="hsk_level" value={currentCharacter.hsk_level}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            components: <input className="short" onChange={handleChange} number="true" name="components" value={currentCharacter.components}/>
            strokes: <input className="short" onChange={handleChange} number="true" name="strokes" value={currentCharacter.strokes}/>
          </div>
          <div className="d-flex flex-row justify-content-around">
            <h3>Pinyin:</h3>
            
            <div>
              add <input onChange={(e)=>setPinyinValue(e.target.value)} name="pinyin" value={pinyinValue} /><button className="btn btn-secondary" onClick={addPinyin}>add</button>
            </div>
          </div>
          <ul>
              {currentCharacter.pinyin.map((word)=>{
                return <li key={word}>{word} <button className="btn btn-secondary" onClick={removePinyin} name={word}>x</button></li>
              })}
            </ul>
          <div>
            <h3>Multiple Choice</h3>
            correct: <input className="short" onChange={handleChangeChoices} name="0" value={currentCharacter.choices[0]}/><br/>
            incorrect: 
          <input className="short" onChange={handleChangeChoices} name="1" value={currentCharacter.choices[1]}/>
          <input className="short" onChange={handleChangeChoices} name="2" value={currentCharacter.choices[2]}/>
          <input className="short" onChange={handleChangeChoices} name="3" value={currentCharacter.choices[3]}/>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="topMargin">
              <button value={-1} onClick={nextPrevious}>previous</button>
              <button value={1} onClick={nextPrevious}>next</button>
            </div>
            <div className="d-flex flex-column">
              <div>
                completed <input onChange={handleComplete} checked={currentCharacter.checked} type="checkbox"></input>
              </div>
            <input type="submit"/>
            </div>
          </div>
        </form>
        <div>
          <h3>Incorrect Answers</h3>
            <ul>
              {Object.keys(currentCharacter.incorrect).map((key)=>{
                return <li key={key}>{key} - {currentCharacter.incorrect[key]}</li>
              })}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default CharacterEditor