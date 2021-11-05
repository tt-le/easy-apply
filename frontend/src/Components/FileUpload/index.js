import React, { useState } from "react";
import { Grid, Button} from "@material-ui/core";

const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {

    if(!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)/) && props.text == "Profile Picture") {
      alert("incorrect profile photo format (Accepted: jpeg, png, jpg, gif)")
    } else if (!event.target.files[0].name.match(/.mp4/) && props.text == "Elevator Pitch") {
      alert("Incorrect elavator pitch format (Accepted: mp4)")
    } else {
      props.setSelectedFile(event.target.files[0])
    }

  };
  return (
    <Grid fullwidth>
        <Button onClick={handleClick} fullwidth variant="contained"
                  color="primary">
        {props.text}
      </Button>
      <input type="file"
             name="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
             fullwidth
      /> 
    </Grid>
  );
};
export default FileUploader;