import React, {useState} from "react";

function QuestionCreator(){
  const [charInput, setCharInput] = useState('')
  const [result, setResult] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const requestBody = {characterList: charInput.split('')};
      const response = fetch('./api/generate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      // const reply = response.data.result.choices[0];
      debugger;
      // console.log("returned reply: ", reply)
      // setResult(reply);
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div>
      <form onSubmit={onSubmit}>
        Create words
        <input value={charInput} onChange={(e)=>setCharInput(e.target.value)}></input>
        <input type="submit" />
      </form>
      <h2>Result</h2>
      <ul>
        {result ? Object.keys(result).map((char)=>{
          return <li key={char}>{char}: {result[char][0]+result[char][1]+result[char][2]+result[char][3]}</li>
        }) :<li>no items</li>}
      </ul>
    </div>
  )
}

export default QuestionCreator