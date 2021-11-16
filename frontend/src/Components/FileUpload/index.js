import React, { useState } from "react";
import { Grid, Button} from "@material-ui/core";

const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);
  const [fileName, setFileName] = useState(); 
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    if (props.page=="signUp") {
      if(!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)/) && props.text == "Profile Picture") {
        alert("incorrect profile photo format (Accepted: jpeg, png, jpg, gif)")
      } else if (!event.target.files[0].name.match(/.mp4/) && props.text == "Elevator Pitch") {
        alert("Incorrect elavator pitch format (Accepted: mp4)")
      } else {
        props.setSelectedFile(event.target.files[0])
        setFileName(event.target.files[0].name)
      }
    }

    if (props.page=="ApplyJob") {
      if(!event.target.files[0].name.match(/.(jpg|jpeg|png|gif|pdf)/) && props.text == "Upload Resume") {
        alert("incorrect profile photo format (Accepted: pdf)")
      } else if (!event.target.files[0].name.match(/.mp4/) && props.text == "Upload Pitch") {
        alert("Incorrect elavator pitch format (Accepted: mp4)")
      }
      else {
        props.setSelectedFile(event.target.files[0])
        setFileName(event.target.files[0].name)
      }
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

      <h1> {fileName} </h1>
    </Grid>
  );
};
export default FileUploader;