import React from "react";
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
    }
  }).catch(error => {
    if(error.response.status == 418) {
      alert("Incorrect Username or Password, try again!")
    }
  })
}

const Login = (props) => {
  var history = useHistory();
  
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
              <input type="password" id="p" placeholder="Password" required="required" />
              <button type="submit" class="btn btn-primary btn-block btn-large" onClick={() => sendLogin(history)}>Let me in.</button>
            </Form>
          </Formik>
          <Link href="/signup" variant="body2" style={{paddingTop:"10px"}}>Don't have an Account?</Link>
        </div>
      </div>
    </body>
  )};

  export default Login;
