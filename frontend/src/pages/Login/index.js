import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, Link, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import './index.css';

import ReactDOM from 'react-dom';
const Login = () => (
    <body>
    <div>
      <h1>Login</h1>
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
          <label htmlFor="Email">Email</label>
          <Field id="Email" name="Email" placeholder="Bob@gmail.com" />
          
          <label htmlFor="Password">Password</label>
          <Field id="Password" name="Password" placeholder="yourpassword" />
  
          <button type="Login">Login</button>
        </Form>
      </Formik>
    </div>
    </body>
  );

  export default Login;
