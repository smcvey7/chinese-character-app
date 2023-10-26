import React, {useState, useEffect, useContext} from "react";
import Html5QrcodePlugin from "./QRScanner";
import MyContext from "./MyContext";

function JoinNewClass(){
  const {user} = useContext(MyContext)
  const [scanning, setScanning] = useState(false)
  const [newClassUUID, setNewClassUUID] = useState("")
  const [showBanner, setShowBanner] = useState(false)
  const [bannerContent, setBannerContent] = useState("")
  const [errors, setErrors] = useState(null)

  const onNewScanResult = (decodedText) => {
    setShowBanner(true)
    setBannerContent("Scanned successfully!")
    setTimeout(()=>{setShowBanner(false)}, 5000)
    const uuid = decodedText.slice(-36)
    setNewClassUUID(uuid)
    cameraStop()
  }

  function handleSubmit(e){
    e.preventDefault()
    setErrors(null)
    
    fetch(`/registrations`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        student_id: user.id,
        class_group_uuid: newClassUUID
      })
    })
    .then((r)=>{
      if (r.ok){
        r.json().then((data)=>{
          setBannerContent("Successfully joined class!")
          setShowBanner(true)
          setTimeout(()=>{setShowBanner(false)}, 5000)
          setNewClassUUID("")
        })
      }else{
        r.json().then((data)=>{
          setErrors(data.errors)
        })
      }
    })
  }

  function handleChange(e){
    setNewClassUUID(e.target.value)
  }

  function showHideScanner(){
    if (scanning){
      cameraStop()
    }
    setTimeout(()=>{
      setScanning(!scanning)
    }, 500)
    
  }

  function cameraStop(){
    const stopCameraButton = document.getElementById("html5-qrcode-button-camera-stop") || null
    if (stopCameraButton){stopCameraButton.click()}
  }

  return(
    <div className="topMargins">
      <h3>Join a class</h3>
      <div className="d-flex flex-horizontal">
        <form onSubmit={handleSubmit}>
          <label>Class code:</label><br/>
          <input type="text" name="class_code" value={newClassUUID} placeholder="scan QRcode below" onChange={handleChange}/>
          <input type="submit" value="Join"/>
        </form>
        <ul className="red">
          {errors ? errors.map((error, index)=><li key={index}>{error}</li>) : null}
        </ul>
      </div>
      <button onClick={showHideScanner}>{scanning ? "Hide scanner" : "Use QRcode"}</button>
      {showBanner ? <div className="banner"><h2>{bannerContent}</h2></div> : <></>}
      {scanning ? <div>
        <Html5QrcodePlugin
            fps={10}
            qrbox={500}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
        />
      </div>
      : <></>}
        
    </div>
  )
}

export default JoinNewClass