import React from "react";

import {
  CssBaseline,
  Container,
  Paper,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";

import SignUpForm from "../../Components/SignUpForm/index"

function SignUp() {
  return (
    <Container maxWidth="md" style={{ height: "100%" }}>
      <CssBaseline>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item>
            <Grid container justify="center">
              <Box marginTop={3}>
                <Typography variant="h5">Sign up</Typography>
              </Box>
            </Grid>

            <Box padding={4}>
              <SignUpForm />
            </Box>
          </Grid>
        </Grid>
      </CssBaseline>
    </Container>
  );
}

export default SignUp;