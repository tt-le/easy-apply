import { useState, useEffect } from 'react';
import api from '../../api';
import { Button, Box } from "@material-ui/core";
import { useLocation } from 'react-router-dom'
import { useHistory } from "react-router";
let route;

const clickHandler = (history) => {
    const confirmEmail = route.pathname.split('--')[1].split('http://localhost:8080/');
    console.log(confirmEmail);
    api.get(confirmEmail[1]).then((resp) => {
        if(resp.status === 200) {
          history.push("/login");
        }
      }).catch(error => {
        if(error.response.status === 401) {
          alert("Token expired")
        }
      })
}


const ConfirmEmail = (prop) => {
    route = useLocation();
    var history = useHistory();
    
    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <Box textAlign='center' sx={{ display:'flex',height: '100vh',justifyContent:'center', alignItems:'center' }}>
        <Button onClick={()=>{clickHandler(history)}} variant="outlined" align-items="center" sx={{justifyContent: 'center', alignItems:'center' }} >
            Confirm your email!
        </Button>
    </Box>
    </div>);
};

export default ConfirmEmail;