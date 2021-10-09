import React from "react";
import { Grid, Button} from "@material-ui/core";

const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <Grid fullwidth>
        <Button onClick={handleClick} fullwidth variant="contained"
                  color="primary">
        {props.text}
      </Button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
             fullwidth
      /> 
    </Grid>
  );
};
export default FileUploader;