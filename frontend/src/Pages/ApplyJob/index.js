import React, {useState, useEffect} from 'react';
//import Button from '@material-ui/core/Button';
import { Formik, Form, Field} from "formik";
import { useLocation, useHistory } from "react-router-dom";
import { Button, MenuItem, Grid} from "@material-ui/core";
import FileUploader from "../../Components/FileUpload";
import req from "../../api/index"
 
const ApplyJob = () => {
    const [selectedFile, setSelectedFile] = useState(""); //Contains information about currently uploaded file
    const [selectedPitch, setSelectedPitch] = useState(""); //Contains information about currently uploaded file
    let history = useHistory();
    let route = useLocation();

    const initialValuesApplicant = {};

    function apply(selectedFile, selectedPitch, history) {
        var form_data = new FormData();
      
        form_data.append("resume", selectedFile);
        form_data.append("pitch", selectedPitch);
        form_data.append("jobID", route.pathname.split('/')[2]);

     //   console.log(route.pathname.split('/')[2]);

      
        req.put("/jobs/applyjob", form_data).then((resp) => {
            console.log(resp); 

          if(resp.status == 200) {
            history.push("/JobBoard");
          }
        }).catch(error => {
            console.log(error); 
          if(error.response.status == 418) {
            alert("Error");
          }
        })
      }

    // const changeHandler = (event) => {
	// 	setSelectedFile(event.target.files[0]); //Sets selected file to the file uploaded using button below
	// };


  return (

    <Formik initialValues={initialValuesApplicant} onSubmit={( nextValues ) => { apply(selectedFile, selectedPitch, history) }}>
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
                    <FileUploader text="Upload Resume" setSelectedFile={setSelectedFile} page="ApplyJob"/>
                    <FileUploader text="Upload Pitch" setSelectedFile={setSelectedPitch} page="ApplyJob"/>
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
                    Submit
                </Button>
                
                </Grid>

            </div>

        </Form> 
    )}
    </Formik>


  );
}
 
export default ApplyJob;