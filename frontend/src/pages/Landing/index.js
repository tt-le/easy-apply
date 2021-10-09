import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button'
import './landing.css'

function signup() {
    const landingPage = (
        <div id="root">
            <div id="topBanner">
                <div id="jobSeekerQuestion">
                    <h3>Looking for a job? Look no further...</h3>
                </div>
                <div id ="promotionalImage">
                    <img src="./landing_page_image.jpg"></img>
                </div>
                <div id ="employerQuestion">
                    <h3>Tired of sifting through resumes? Then don't!</h3>
                </div>
            </div>
            <div id="middleBanner">
                <div id="easyApplyPromotion">
                    <h4>easyApply: The all-in-one employment platform!</h4>
                </div>
                <div id="easyApplyFeatures">
                    <h4>easyApply...</h4>
                    <p>...instantly matches talent to open postings!</p>
                    <p>...schedules and hosts interviews with the click of a button!</p>
                    <p>...Allows you to differentiate yourself with a custom "elevator pitch"</p>
                </div>
                <div id="easyApplySignUp">
                    <h4>Interested?</h4>
                    <Button>Sign up now!</Button>
                </div>
            </div>
            <div id ="bottomBanner">
               <div id="testimonials">
                   <h4>Don't take our word for it, see what your peers say!</h4>
                </div>
                <div id="testimonial1">
                    <p>easyApply is great!</p>
                    <img src="./testimonal1.jpg"></img>
                </div>
                <div>
                    <p>I found a job so easily!</p>
                    <img src="./testimonal2.jpg"></img>
                </div>
                <div>
                    <p>It usually takes weeks to find the right candidate, I found them in 3 days!</p>
                    <img src="./testimonal3.jpg"></img>
                </div> 
            </div>
        </div>
    );
    ReactDOM.render(landingPage, getElementByID('root'));
}