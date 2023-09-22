import React, {useEffect, useState, useContext} from "react";
import PinyinEditor from "./PinyinEditor";
import CharacterInfo from "./CharacterInfo";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import CharacterFilter from "./CharacterFilter";
import MyContext from "./MyContext";
// const {set} = require('lodash.set')
// var _ = require('lodash')

function CharacterEditor(){
  const {user, characters} = useContext(MyContext)
  const [characterList, setCharacterList] =  useState(null)
  const [currentCharacter, setCurrentCharacter] = useState(null)
  const [filteredList, setFilteredList] = useState(null)
  const [showBanner, setShowBanner] = useState(false)
  const [bannerContent, setBannerContent] = useState("")  
  
  useEffect(()=>{
    if (!characters){
      return(<em>loading</em>)
    }

    setFilteredList(characters.filter((char)=>char.hsk_level === 1).sort((a, b)=>{return a.id-b.id}))
    setCharacterList(characters.sort((a, b)=>{return a.id-b.id}))
    setCurrentCharacter(characters[0])
  }, [characters])


  function handleChange(e){
    const value = e.target.getAttribute("number")==="true" ? e.target.value==="" ? "" : parseInt(e.target.value) : e.target.value

    // set(update, e.target.name, value);

    setCurrentCharacter({
      ...currentCharacter,
      [e.target.name]: value
    })
  }

function nextPrevious(e){
  e.preventDefault()
  const nextChar = characterList.filter((char)=>char.id===currentCharacter.id + parseInt(e.target.value))[0]

  // if (degree === 1 && currentCharacter.)
  if (nextChar) setCurrentCharacter(nextChar)
}

function handleSubmit(e){
  setShowBanner(true)
  setBannerContent("character updated")
  setTimeout(()=>{setShowBanner(false)}, 5000)
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

function handleComplete(e){
  setCurrentCharacter({
    ...currentCharacter,
    checked: e.target.checked
  })
}

// function handleAutofill(e){
//   e.preventDefault()
//   fetch(`https://api.ctext.org/getcharacter?char=${currentCharacter.simplified}`)
//   .then((r)=>r.json())
//   .then((data)=>autofillData(data))
// }

// function autofillData(autoData){
//   const traditional = getTraditional(autoData)
//   const strokes = autoData.totalstrokes
//   const pinyin = autoData.readings.mandarinpinyin
 
//   const choices = createFakes(autoData.char, autoData.hsk_level)

//   setCurrentCharacter({
//     ...currentCharacter,
//     traditional: traditional,
//     strokes: strokes,
//     pinyin: pinyin, 
//     choices: choices
//   })
// }

// function createFakes(input, level){
//   // const dictData = data.filter((char)=>char.ci.includes(input))
//   // const wordList = dictData.map((word)=>{return word.ci})
//   const charListByLevel = characterList.filter((char)=>char.hsk_level <= level)
//   const items = _.sampleSize(charListByLevel, 3).map((word)=>{return word.simplified})
//   const fakes = [input, input, input].map((word, index)=>{
//     const beforeOrAfter = Math.floor(Math.random()*2)
//     if (beforeOrAfter === 0){
//       return word+items[index]
//     }else return items[index]+word
//   })


//   return [currentCharacter.choices[0], ...fakes]
// }

// function getTraditional(char){
//   if (char.variants){
//     const variants = char.variants.filter((char)=>char.relation === "kTraditionalVariant")
//     if (variants.length !== 0){
//       return variants[0].character
//     }else return ""
//   }else return ""
// }



// function preloadAll(){
//   const needPinyin = characterList.filter((char)=>char.pinyin.length === 0)
//   const needChoices = characterList.filter((char)=>char.choices[1] === "")
//   needPinyin.forEach((char)=>{
//     fetch(`https://api.ctext.org/getcharacter?char=${char.simplified}`)
//     .then((r)=>r.json())
//     .then((data)=>{
//       console.log(data)
//       const traditional = getTraditional(data)
//       const strokes = data.totalstrokes
//       const pinyin = data.readings.mandarinpinyin
//       const updatedChar = {
//         ...char,
//         traditional: traditional,
//         strokes: strokes,
//         pinyin: pinyin
//       }
//       submitUpdate(updatedChar)
//     })
// })
//   needChoices.forEach((char)=>{
//     console.log(char, createFakes(char.simplified, char.hsk_level))
//     const updatedChar = {
//       ...char,
//       choices: createFakes(char.simplified, char.hsk_level)
//     }
//     submitUpdate(updatedChar)
//   })
// }

if (!user || !user.admin){
  return(
    <em>Character editor is only available to admins.</em>
  )
}

  if (!currentCharacter) return <></>

  return(
    <div>
      <CharacterFilter characterList={characterList} setCurrentCharacter={setCurrentCharacter} currentCharacter={currentCharacter} setFilteredList={setFilteredList} filteredList={filteredList}/>
      <div id="editorCard" className="full card topMargins">
        <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-around">
          {showBanner ? <div className="banner"><h2>{bannerContent}</h2></div> : <></>}
          <CharacterInfo currentCharacter={currentCharacter} handleChange={handleChange}  />
          <PinyinEditor currentCharacter={currentCharacter} setCurrentCharacter={setCurrentCharacter} />
          <MultipleChoiceEditor currentCharacter={currentCharacter} setCurrentCharacter={setCurrentCharacter} />
          <div className="d-flex flex-row justify-content-between">
            <div className="topMargin">
              {currentCharacter.id === 1 ? <></> :<button value={-1} onClick={nextPrevious}>previous</button>}
              {currentCharacter.id === 3000 ? <></> :<button value={1} onClick={nextPrevious}>next</button>}
            </div>
            <div className="d-flex flex-column">
              <div>
                completed <input onChange={handleComplete} checked={currentCharacter.checked} type="checkbox"></input>
              </div>
            <input type="submit"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CharacterEditor