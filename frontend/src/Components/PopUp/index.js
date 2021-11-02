import React, {useState} from "react";


function PopUp() {

  const [buttonPopup, setButtonPopup] = useState(false); 
  
    return <div> 
        {(buttonPopup) ? (
      <div className="popup">
        <div className="popup-inner"> 
          <button className="close-btn" onClick={() => setButtonPopup(false)} >Close Popup</button>
        </div>
      </div>
      ) : ""}
    </div>
  
    }
  
    export default PopUp