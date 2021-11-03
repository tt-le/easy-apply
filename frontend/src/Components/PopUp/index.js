import React from "react";
  
function PopUp(props) {

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner"> 
      //<p>{props.message}</p>
        <button className="close-btn" onClick={() => props.setTrigger(false)} >Close Popup</button>
      {props.children}
      </div>
    </div>
    ) : ""; 
  }

  export default PopUp 