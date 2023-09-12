import React from "react";

function Finished({finalScore}){ 
  return(
    <div>
      <h1>Test Finished</h1>
      <div id="testCard" className="full  topMargins">
        <div className="center border d-flex flex-column">
          <h2 id="testChar">You scored {finalScore}</h2>
          <em>This indicates that you recognize around {finalScore*20} characters</em>
        </div>
      </div>
    </div>
  )
}

export default Finished