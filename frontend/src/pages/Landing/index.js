import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import logo from "./easy-apply_logo.jpg"
import './landing.css'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Easy-Apply
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Standard',
    price: '0',
    description: [
      'Hire Easily on a budget',
      'Distribution to 100+ job sites',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Premium',
    subheader: 'Most popular',
    price: '24.00',
    description: [
      'Find qualified candidates fast',
      'Distribution to 100+ job sites',
      'Premium placement in job alert emails',
      'Access to our database of 25 million+ resumes',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Try now',
    buttonVariant: 'outlined',
  },
];

// const footers = [
//   {
//     title: 'Company',
//     description: ['Team', 'History', 'Contact us', 'Locations'],
//   },
//   {
//     title: 'Features',
//     description: [
//       'Cool stuff',
//       'Random feature',
//       'Team feature',
//       'Developer stuff',
//       'Another one',
//     ],
//   },
//   {
//     title: 'Resources',
//     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
//   },
//   {
//     title: 'Legal',
//     description: ['Privacy policy', 'Terms of use'],
//   },
// ];

function PricingContent() {
  return (
    <React.Fragment >
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}/>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
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
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
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
            <br></br>Tired of sifting through resumes? Then don't!
        </Typography>
      </Container>
      {/* End hero unit */}
      {/* <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} href="./signup">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container> */}
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
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

// import * as React from 'react';
// import ReactDOM from 'react-dom';
// import Button from '@mui/material/Button'
// import './landing.css'
// import logo from "./easy-apply_logo.jpg"
// import { Link } from 'react-router-dom';

// const landingPage = (props) => {
//     return (<div id="root">
//         <div id="topBanner">
//             <div id="jobSeekerQuestion">
//                 <h3>Looking for a job? Look no further...</h3>
//             </div>
//             <div id ="promotionalImage">
//                 <img src={logo}></img>
//             </div>
//             <div id ="employerQuestion">
//                 <h3>Tired of sifting through resumes? Then don't!</h3>
//             </div>
//         </div>
//         <div id="middleBanner">
//             <div id="easyApplyPromotion">
//                 <h4>easyApply: The all-in-one employment platform!</h4>
//             </div>
//             <div id="easyApplyFeatures">
//                 <h4>easyApply...</h4>
//                 <p>...instantly matches talent to open postings!</p>
//                 <p>...schedules and hosts interviews with the click of a button!</p>
//                 <p>...Allows you to differentiate yourself with a custom "elevator pitch"</p>
//             </div>
//             <div id="easyApplySignUp">
//                 <h4>Interested?</h4>
//                 <Link to="/signup"><Button>Sign up now!</Button></Link>
//                 <Link to="/login"><Button>Already have an account?</Button></Link>
//             </div>
//         </div>
//         <div id ="bottomBanner">
//             <div id="testimonials">
//                 <h4>Don't take our word for it, see what your peers say!</h4>
//             </div>
//             <div id="testimonial1">
//                 <p>easyApply is great!</p>
//                 <img src="./testimonal1.jpg"></img>
//             </div>
//             <div>
//                 <p>I found a job so easily!</p>
//                 <img src="./testimonal2.jpg"></img>
//             </div>
//             <div>
//                 <p>It usually takes weeks to find the right candidate, I found them in 3 days!</p>
//                 <img src="./testimonal3.jpg"></img>
//             </div> 
//         </div>
//     </div>)
// }

// export default landingPage;