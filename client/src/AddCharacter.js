import React, {useState} from "react";

function AddCharacter(){
  const [charInfo, setCharInfo] = useState({
    char: "",
    pinyin: [],
    hsk: 1
  })
return(
  <div>
    <h1>Add Character</h1>
    <form>
      <input/>
    </form>
  </div>
)
}

export default AddCharacter