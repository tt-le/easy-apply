import React, { useState, useEffect } from "react";
import api from "../../api"; 
import NavBar from '../../Components/NavBar';
import "./index.css";
import {
    Grid,
    Paper,
    Avatar
  } from "@material-ui/core";

import 'antd/dist/antd.css';
import { Input} from "antd";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserInfo from "../../Components/UserInfo";


const ProfilePage = () => {
    const [first, setFirst] = useState(""); 
    const [last, setLast] = useState(""); 
    const [info, setInfo] = useState([]);
    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

useEffect(() => {
        loadData();
    },[])

    const loadData = async() => {
        const response = await api.get("/auth/profile");
        const myData2 = response['data'];       
        console.log(response);
        console.log(myData2);
        const firstname= myData2['firstName'];
        const lastname = myData2['lastName'];
        const info = setInfo(myData2); 
        setFirst(firstname);
        setLast(lastname);
    }

    const gender = info['gender']; 
    const birth = info['birthDate']
    const city = info['city'];
    const country = info['country'];


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#2b2b2b', height: "100vh" }}>
        <NavBar/>
            <Grid>
                <Avatar alt="" src="/static/images/avatar/1.jpg" style={{ border: "2px solid", height: "200px", width: "200px" }}/>
                <h1 className="Name" style={{color: "black", center: "15px"}}> {first} {last} </h1>
                <h1 className="gender" style={{color: "black", left: "5px"}}> {gender} </h1>
                <h1 className="birth" style={{color: "black", left: "5px"}}> Lives in: {city} {country} </h1>
            </Grid>              
            <UserInfo/>

        </Paper>
        );
    };

export default ProfilePage 