import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
 
const ApplyJob = () => {
    const [selectedFile, setSelectedFile] = useState(); //Contains information about currently uploaded file

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]); //Sets selected file to the file uploaded using button below
	};
  return (
    <div style={{
      display: 'flex',
      margin: 'auto',
      width: 400,
      flexWrap: 'wrap',
    }}>
      <input
        type="file"
        onChange={changeHandler}
        style={{ display: 'none' }}
        id="contained-button-file"
      /> 
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Resume
        </Button>
      </label>
    </div>
  );
}
 
export default ApplyJob;