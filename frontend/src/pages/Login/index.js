import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, Link, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import logo from "./easy-apply_logo.jpg";
import './index.css';

const Login = () => (
    <body>
      <div class="body">
        <div class="login">
          <h1><img src={logo} alt="logo" style={ {"width":"100%"} }/></h1>
          <Formik
            initialValues={{
              Email: '',
              Password: '',
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <input type="text" name="u" placeholder="Email" required="required" />
              <input type="password" name="p" placeholder="Password" required="required" />
            < button type="submit" class="btn btn-primary btn-block btn-large">Let me in.</button>
            </Form>
          </Formik>
        </div>
      </div>
    </body>
  );

  export default Login;
