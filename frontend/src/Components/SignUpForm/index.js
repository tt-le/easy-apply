import {React} from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, MenuItem, Grid} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import * as yup from "yup";
import FileUploader from "../FileUpload";
import req from "../../api/index"
import "./index.css";

const initialValuesApplicant = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: null,
  gender: "",
  address: "",
  city: "",
  country: "",
};

const initialValuesEmployer = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  organization: "",
  address: "",
  city: "",
  country: "",
};

const validationSchemaApplicant = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password must be minimum 8 characters"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  birthDate: yup.date().required("Required").nullable(),
  gender: yup.string().required("Required"),
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
  elevatorPitch: yup.mixed().optional(),
  profilePicture:  yup.mixed().optional()
});

const validationSchemaEmployer = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password must be minimum 8 characters"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  organization: yup.string().required("Required"),
  address: yup.string().required("Required"),
  city: yup.string().required("Required"),
  country: yup.string().required("Required"),
});

function register(history, user, selectedPhoto, selectedVideo, registerObject) {
  var form_data = new FormData();
  registerObject["role"] = user;

  for(var key in registerObject) {
    form_data.append(key, registerObject[key]);
  }

  form_data.append("photo", selectedPhoto);
  form_data.append("video", selectedVideo);

  req.post("auth/signup", form_data).then((resp) => {
    if(resp.status == 201) {
      history.push("/JobBoard");
    }
  }).catch(error => {
    if(error.response.status == 418) {
      alert("User already exists!");
    }
  })
}

function SignUpForm(props) {
  const [user, setUser] = useState("Applicant");
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [selectedVideo, setSelectedVideo] = useState();

  let history = useHistory();

  if(user == "Applicant") {
    return (
      <Formik initialValues={initialValuesApplicant} validationSchema={validationSchemaApplicant}
      onSubmit={( nextValues ) => { register(history, user, selectedPhoto, selectedVideo, nextValues) }}>
        {({ submitForm, isSubmitting, touched, errors }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form>
              <Grid
                container
                direction="column"
                justify="space-evenly"
                spacing={2}
              >
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="firstName"
                      type="text"
                      label="First name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="lastName"
                      type="text"
                      label="Last name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="email"
                      type="email"
                      label="Email"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="confirmPassword"
                      type="password"
                      label="Re-enter password"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      component={DatePicker}
                      name="birthDate"
                      label="Date of birth"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      size="small"
                      fullWidth
                      disableFuture
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      type="text"
                      name="gender"
                      label="Gender"
                      select
                      variant="outlined"
                      size="small"
                      fullWidth
                    >
                      <MenuItem key="Male" value="Male">
                        Male
                      </MenuItem>
                      <MenuItem key="Female" value="Female">
                        Female
                      </MenuItem>
                      <MenuItem key="Other" value="Other">
                        Other
                      </MenuItem>
                    </Field>
                  </Grid>
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="address"
                    type="text"
                    label="Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="city"
                      type="text"
                      label="City"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="country"
                      type="text"
                      label="Country"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <FileUploader text="Profile Picture" setSelectedFile={setSelectedPhoto} page="signUp"/>
                  </Grid>
                  <Grid item xs={6}>
                  <FileUploader text="Elevator Pitch"setSelectedFile={setSelectedVideo} page="signUp" fullwidth/>
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
                    Register
                  </Button>
                </Grid>
                <Grid item container justify="center">
                  <Link className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary" to="/login" style={{cursor:"pointer"}}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
                <Grid item container justify="center">
                  <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary" onClick={() => setUser("Employer")}  style={{cursor:"pointer"}}>
                    Are you an Employer?
                  </a>
                </Grid>
              </Grid>
            </Form>
          </MuiPickersUtilsProvider>
        )}
      </Formik>
    );
  } else if (user == "Employer") {
    return (
      <Formik initialValues={initialValuesEmployer} validationSchema={validationSchemaEmployer}
      onSubmit={( nextValues ) => { register(history, user,null,null, nextValues) }}>
        {({ submitForm, isSubmitting, touched, errors }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form>
              <Grid
                container
                direction="column"
                justify="space-evenly"
                spacing={2}
              >
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="firstName"
                      type="text"
                      label="First name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="lastName"
                      type="text"
                      label="Last name"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="email"
                      type="email"
                      label="Email"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="confirmPassword"
                      type="password"
                      label="Re-enter password"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      type="text"
                      name="organization"
                      label="Organization"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Field
                    component={TextField}
                    name="address"
                    type="text"
                    label="Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="city"
                      type="text"
                      label="City"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      name="country"
                      type="text"
                      label="Country"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container justify="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    fullWidth
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item container justify="center">
                  <Link className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary" to="/login" style={{cursor:"pointer"}}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
                <Grid item container justify="center">
                  <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-body2 MuiTypography-colorPrimary" onClick={() => setUser("Applicant")}  style={{cursor:"pointer"}}>
                    Are you an Applicant?
                  </a>
                </Grid>
              </Grid>
            </Form>
          </MuiPickersUtilsProvider>
        )}
      </Formik>)
  }
}

export default SignUpForm;