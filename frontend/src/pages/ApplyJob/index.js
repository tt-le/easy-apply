import React, {useState, useEffect} from 'react';
//import Button from '@material-ui/core/Button';
import { Formik, Form, Field} from "formik";
import { Button, MenuItem, Grid} from "@material-ui/core";
import FileUploader from "../../Components/FileUpload";
import req from "../../api/index"
 
const ApplyJob = () => {
    const [selectedFile, setSelectedFile] = useState(); //Contains information about currently uploaded file

    function register(selectedFile, history ) {
        var form_data = new FormData();
      
        form_data.append("resume", selectedFile);
      
        req.post("/JobBoard", form_data).then((resp) => {
          if(resp.status == 201) {
          //  history.push("/JobBoard");
          }
        }).catch(error => {
          if(error.response.status == 418) {
            alert("User already exists!");
          }
        })
      }

    // const changeHandler = (event) => {
	// 	setSelectedFile(event.target.files[0]); //Sets selected file to the file uploaded using button below
	// };


  return (

    <Formik onSubmit={( nextValues ) => { register(selectedFile) }}>
    {({ submitForm, isSubmitting, touched, errors }) => (
        <Form>
            <div style={{
            display: 'flex',
            margin: 'auto',
            width: 400,
            flexWrap: 'wrap',
            }}>
                <Grid item container spacing={2}>
                <Grid item xs={6}>
                    <FileUploader text="Resume" setSelectedFile={setSelectedFile} page="ApplyJob"/>
                </Grid>
                </Grid>

            <Grid item container justify="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    size="small"
                    fullWidth
                >
                    Upload Resume
                </Button>
                </Grid>

            </div>

        </Form> 
    )}
    </Formik>


  );
}
 
export default ApplyJob;