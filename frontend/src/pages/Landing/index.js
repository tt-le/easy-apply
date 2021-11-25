import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import logo from "./easy-apply_logo.jpg"
import './landing.css'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Easy-Apply
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function PricingContent() {
  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        style={{ backgroundColor: '#2b2b2b' }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <img src={logo} className="logo"></img>
          </Typography>
          <Button href="/signup" variant="outlined" sx={{ my: 1, mx: 1.5 }} style={{ color: "#00FECF" }}>
            Sign up now!
          </Button>
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }} style={{ color: "#00FECF" }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 8, pb: 6 }} style={{ backgroundColor: '#FFFFFF' }} >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          <img src={logo}></img>
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
            Looking for a job? Look no further...
            <br></br>Tired of shifting through resumes? Then don't!
        </Typography>
      </Container>
      {/* End hero unit */}
      {/* Footer */}
      <Container
        maxWidth="xl"
        component="footer"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <Copyright sx={{ mt: 5 }}/>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}