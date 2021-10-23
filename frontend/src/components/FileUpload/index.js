import React, { useState } from "react";
import { Grid, Button} from "@material-ui/core";

const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    props.setSelectedFile(event.target.files[0]);
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