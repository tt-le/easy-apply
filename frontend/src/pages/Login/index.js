import React, {useState} from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, Typography, Link } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import logo from "./easy-apply_logo.jpg";
import './index.css';
import req from "../../api/index";
import { useHistory } from "react-router";

function sendLogin(history) {
  var email = document.getElementById("u").value;
  var password = document.getElementById("p").value;
  console.log("here");
  
  req.post("auth/login", {email: email, password: password}).then((resp) => {
    if(resp.status == 201) {
      history.push("/JobBoard");
    } else if (resp.status == 200) {
      history.push("/dashboard");
    }
  }).catch(error => {
    if(error.response.status === 401) {
      alert("Incorrect Username or Password, try again!");
    }
    if(error.response.status === 403) {
      alert("Email not verified!");
    }
  })
}

function retrievePassword() {
  var email = document.getElementById("u").value;
  console.log("hello")
  req.post("auth/forgot_password", {email: email} ).then((resp) => {
    if(resp.status === 200) {
      alert("An email was sent to your inbox!")
    }
  }).catch(error => {
    alert("Try again later.")
  })
}

const Login = (props) => {
  var history = useHistory();
  const [forgotPassword, setForgotPassword] = useState(false);

  return(<body>
      <div class="body">
        <div class="login">
          <h1><img src={logo} alt="logo" style={ {"width":"100%"} }/></h1>

          <Formik
            initialValues={{
              Email: '',
              Password: '',
            }}
          >
            <Form>
              <input type="text" id="u" placeholder="Email" required="required" />
              {!forgotPassword ? 
              <div>
                <input type="password" id="p" placeholder="Password" required="required" /> 
                <button type="submit" class="btn btn-primary btn-block btn-large" onClick={() => sendLogin(history)}>Let me in.</button>
              </div>
              :
              <button type="submit" class="btn btn-primary btn-block btn-large" onClick={() => retrievePassword()}>Retrieve password</button>
              }
            </Form>
          </Formik> 
          <Link href="/signup" variant="body2"  style={{paddingTop:"10px"}}> Don't have an Account?</Link>
          <Link  variant="body2" style={{paddingTop:"10px", justifyContent: "flex-start",cursor: "pointer"}} onClick={()=>{setForgotPassword(true)}}> Forgot your password? </Link>
          
        </div>
      </div>
      
    </body>
    
  )};

  export default Login;
