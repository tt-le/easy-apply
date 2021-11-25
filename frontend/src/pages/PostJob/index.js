import * as React from "react";
import { useState, useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import req from "../../api/index";
import { useHistory } from "react-router";

function PostJob() {

    const [Title, setTitle] = useState('');
    const [Company, setCompany] = useState('');
    const [Email, setEmail] = useState('');
    const [Industry, setIndustry] = useState('');
    const [Location, setLocation] = useState('');
    const [Description, setDescription] = useState('');
    const history = useHistory();

    useEffect(() => {
        req.get("/jobs/checkEmployer").then((resp) => {
            if(resp.status != 200) {
                history.push("/login")
            }
        }).catch((err) => {
            history.push("/login")
        });
    }, []);

    const handleTitleChange = event => {
        setTitle(event.target.value);
    };
    const handleCompanyChange = event => {
        setCompany(event.target.value);
    };
    const handleEmailChange = event => {
        setEmail(event.target.value);
    };
    const handleIndustryChange = event => {
        setIndustry(event.target.value);
    };
    const handleLocationChange = event => {
        setLocation(event.target.value);
    };
    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    };

    const handleClick = () => {
        // console.log("Title is", Title)
        // console.log("Company is", Company)
        // console.log("Email is", Email)
        // console.log("Industry is", Industry)
        // console.log("Location is", Location)
        // console.log("Des is", Description)

        req.post("jobs/create", {jobName: Title, companyName:Company, email: Email, industry:Industry, location:Location,
            introduction: Description})
        }
    return (
        <Container>
            <div className="">
            <TextField
            id="standard-textarea"
            label="Job Title"
            placeholder="Enter your job title here."
            variant="standard"
            sx={{ m: 1, width: '100%' }}
            value={Title}
            onChange= {handleTitleChange}
            />
            <TextField
            id="standard-textarea"
            label="Company Name"
            placeholder="Enter your company's name here."
            variant="standard"
            sx={{ m: 1, width: '48%' }}
            value={Company}
            onChange= {handleCompanyChange}
            />
            <TextField
            id="standard-textarea"
            label="Email"
            placeholder="Enter your company's email here."
            variant="standard"
            sx={{ m: 1, width: '48%' }}
            value={Email}
            onChange= {handleEmailChange}
            />
            <TextField
            id="standard-textarea"
            label="Industry"
            placeholder="Enter industry here."
            variant="standard"
            sx={{ m: 1, width: '48%' }}
            value={Industry}
            onChange= {handleIndustryChange}
            />
            <TextField
            id="standard-textarea"
            label="Location"
            placeholder="Enter your job's location here."
            variant="standard"
            sx={{ m: 1, width: '48%' }}
            value={Location}
            onChange= {handleLocationChange}
            />
            <TextField
            id="multi-textarea"
            label="Job Description"
            placeholder="Enter your job description here."
            multiline
            variant="standard"
            sx={{ m: 1, width: '100%' }}
            value= {Description}
            onChange= {handleDescriptionChange}
            />
            </div>
            <Button variant="contained" onClick={handleClick}>Post the job</Button>
        </Container>
    )
}
export default PostJob;