import React from "react";
export default class PopUp {
  handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
   <div className="modal">
     <div className="modal_content">
     <span className="close" onClick={this.handleClick}>&times;    </span>
     <p>I'm A Pop Up!!!</p>
    </div>
   </div>
  );
 }
}