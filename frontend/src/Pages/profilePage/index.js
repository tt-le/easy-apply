import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import "./profilePage.css"
import image from "./im.jpg"

const profile = (props) => {
    return (<div id="root">
        <div id="profileHeader">
            <div>
                <img src={image} width="200"></img>
            </div>    
            <div>
                <Button>Edit</Button>
            </div>
        </div>
        <div id="name">
            <h2>name here</h2>
        </div>
        <div id="age">
            <h3>age here</h3>
        </div>
        <div id="introduction">
            <p>
            </p>
        </div>
    </div>)
}

export default profile;