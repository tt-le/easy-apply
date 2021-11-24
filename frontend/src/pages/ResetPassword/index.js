import React from "react";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import logo from "./easy-apply_logo.jpg";
import './index.css';
import req from "../../api/index";
import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom';
import * as yup from "yup";

let route = ''

function resetPassword(history,  nextValues) {
    console.log(route);
    const token = route.pathname.split("/").slice(-1)[0];
console.log(token);
  req.post(`auth/change_password/${token}`, {password: nextValues.password }).then((resp) => {
    alert("Password changed.");
    console.log(nextValues.password);
    if(resp.status === 200) {
      history.push("/login");
    }
  }).catch(error => {
    if(error.response.status === 401) {
      alert("Email link expired");
    } else if(error.response.status === 400) {
      alert("No password provided");
    } else {
      alert("Try again later.");
    }

  })
}


const schema = yup.object().shape({
    password: yup
      .string()
      .required("Required")
      .min(8, "Password must be minimum 8 characters"),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
})

const ResetPassword = (props) => {
    route = useLocation();
    var history = useHistory();

    return(<body>
      <div class="body">
        <div class="login">
          <h1><img src={logo} alt="logo" style={ {"width":"100%"} }/></h1>

          <Formik
            initialValues={{
              Password: '',
            }}
validationSchema={schema}
      onSubmit={( nextValues ) => { resetPassword(history, nextValues) }}
          >
              {({ submitForm, isSubmitting, touched, errors }) => (
            <Form>
                <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      size="small"
                      sx={{ color: "white"}}
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      name="confirmPassword"
                      type="password"
                      label="Re-enter password"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                <button type="submit" class="btn btn-primary btn-block btn-large" >Change password</button>
            </Form>
              )}
          </Formik> 
        </div>
      </div>
      
    </body>
    
  )};

  export default ResetPassword;
