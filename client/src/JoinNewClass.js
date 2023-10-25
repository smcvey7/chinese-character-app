import React, {useState, useEffect, useContext} from "react";
import Html5QrcodePlugin from "./QRScanner";

function JoinNewClass(){
  const [scanning, setScanning] = useState(false)
  const [newClassUUID, setNewClassUUID] = useState("")

  const onNewScanResult = (decodedText, decodedResult) => {
    const uuid = decodedText.slice(-36)
    setNewClassUUID(uuid)

    const stopCameraButton = document.getElementById("html5-qrcode-button-camera-stop")

    stopCameraButton.click()
    // handle decoded results here
  }

  function handleChange(e){
    setNewClassUUID(e.target.value)
  }

  return(
    <div className="topMargins">
      <h3>Join a class</h3>
      <form>
        <label>Class code:</label>
        <input type="text" name="class_code" value={newClassUUID} placeholder="scan QRcode below" onChange={handleChange}/>
        <input type="submit" value="Join"/>
      </form>
      Scan code to join a class:
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
    </div>
  )
}

export default JoinNewClass