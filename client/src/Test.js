import React, {useState} from "react";

function Test(){
  const [charNum, setCharNum] = useState(0)
  const [pinyinInput, setPinyinInput] = useState({
    pinyin: "",
    umlaut: false,
    tone: 0
  })
  const [pinyinFinal, setPinyinFinal] = useState("")

  const characterList = {
    level1: {
      金: {
        pinyin: ["jīn"],
        word: ["黄金"]
      },
      木: {
        pinyin: ["mù"],
        word: ["木头"]
      },
      水: {
        pinyin: ["shuǐ"],
        word: ["热水"]
      },
      火: {
        pinyin: ["huǒ"],
        word: ["上火"]
      },
      土: {
        pinyin: ["tǔ"],
        word: ["土地"]
      },
    },
    level2: {
      天: {
        character: "天",
        pinyin: ["tiān"],
        word: ["天才"]
      },
      地: {
        pinyin: ["dì"],
        word: ["地球"]
      },
      分: {
        pinyin: ["fēn", "fèn"],
        word: ["分钟"]
      },
      上: {
        pinyin: ["shāng"],
        word: ["上面"]
      },
      下: {
        pinyin: ["xià"],
        word: ["天下"]
      },
    },
    level3: {
      日: {
        pinyin: ["rì"],
        word: ["星期日"]
      },
      月: {
        pinyin: ["yuè"],
        word: ["月亮"]
      },
      照: {
        pinyin: ["zhào"],
        word: ["照片"]
      },
      金: {
        pinyin: ["jīn"],
        word: ["金币"]
      },
      古: {
        pinyin: ["gǔ"],
        word: ["古老"]
      },
    }
  }

  const character1List = Object.keys(characterList.level1)

  // async function onSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("./api/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ characterList: Object.keys(characterList.level1) }),
  //     });

  //     const data = await response.json();
  //     if (response.status !== 200) {
  //       throw data.error || new Error(`Request failed with status ${response.status}`);
  //     }
  //     console.log("response from GPT: ", data.result)
  //     setResult(data.result);
  //   } catch(error) {
  //     // Consider implementing your own error handling logic here
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }

  function validatePinyin(input){
    const pinyinWithTones = /^[a-z]+$/
    if (pinyinWithTones.test(input)){
      return input.slice(0, 6)
    }else if (input === ""){
      return ""
    }else return pinyinInput.pinyin
  }

  function handleChange(e){
    const key = e.target.name
    const input = e.target.value
    let value
    if (key === "pinyin"){
      value = validatePinyin(input)
      }else if (key === "umlaut"){
        value = e.target.className === "btn btn-outline-primary active" ? true : false
      }else{
        value = e.target.value
      }
    const updatedPinyin = {
      ...pinyinInput,
      [key]: value
    }
    setPinyinInput(updatedPinyin)
    formatPinyin(updatedPinyin)
  }

  function formatPinyin(input){
    const letters = input.pinyin.split('')
    const lettersWithUmlaut = input.umlaut ?  addUmlaut(letters) : letters
    const lettersWithTone = addTone(lettersWithUmlaut, input.tone)
    setPinyinFinal(lettersWithTone)
  }

  function addUmlaut(input){
    const lettersWithUmlaut = input.map((letter)=>letter === "u" ? "ü" : letter)
    return lettersWithUmlaut
  }

  function addTone(input, tone){
    let updatedInput = input
    const vowels = ["a", "e", "i", "o", "u", "ü"]
    let found = false
    const vowelWithTones = {
      a: ["a", "ā", "á", "ǎ", "à"],
      e: ["e", "ē", "é", "ě", "è"],
      i: ["i", "ī", "í", "ǐ", "ì"],
      o: ["o", "ō", "ó", "ǒ", "ò"],
      u: ["u", "ū", "ú", "ǔ", "ù"],
      ü: ["ü", "ǖ", "ǘ", "ǚ", "ǜ"]
    }

    vowels.forEach((vowel)=>{
      if (found === false){
        updatedInput = updatedInput.map((letter, i)=>{
          if (letter === "i" && updatedInput[i+1] === "u"){
            return letter
          }else if (letter === vowel){
            found = true
            return vowelWithTones[vowel][tone]
          }else return letter
        })
      }
    })

    return updatedInput
  }

  return(
    <div className="wide">
      <h1>TEST</h1>
      <div id="testCard" className="full card">
        <div className="center border d-flex flex-column">
          <h1 id="testChar">{character1List[charNum]}</h1>
          <h2 id="answerBox" className="border">{pinyinFinal}</h2>
        </div>
        <form className="d-flex flex-row justify-content-around">
          <div>
            <h3 className="center">input pinyin here</h3>
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
              <button onClick={handleChange} name="umlaut" type="button" className="btn btn-outline-primary" data-bs-toggle="button" autoComplete="off" aria-pressed={pinyinInput.umlaut}>¨</button>

              <input type="radio" className="btn-check" name="tone" value={1} id="btnradio1" autoComplete="off" onChange={handleChange} />
              <label className="btn btn-outline-primary" htmlFor="btnradio1">¯</label>

              <input type="radio" className="btn-check" name="tone" value={2} id="btnradio2" autoComplete="off" onChange={handleChange}/>
              <label className="btn btn-outline-primary" htmlFor="btnradio2">´</label>

              <input type="radio" className="btn-check" name="tone" value={3} id="btnradio3" autoComplete="off" onChange={handleChange}/>
              <label className="btn btn-outline-primary" htmlFor="btnradio3">ˇ</label>

              <input type="radio" className="btn-check" name="tone" value={4} id="btnradio4" autoComplete="off" onChange={handleChange}/>
              <label className="btn btn-outline-primary" htmlFor="btnradio4">`</label>

              <input type="radio" className="btn-check" name="tone" value={0} id="btnradio5" autoComplete="off" onChange={handleChange}/>
              <label className="btn btn-outline-primary" htmlFor="btnradio5">none</label>
            </div>
            <br/>
            <input className="pinyinBox" name="pinyin" value={pinyinInput.pinyin} lang="en" onChange={handleChange}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Test