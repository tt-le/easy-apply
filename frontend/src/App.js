import React from "react";
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
// import api from './api';

import Dummy from './pages/Dummy'
import JobBoard from './pages/JobBoard'
import SearchBar from './Components/SearchBar'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import landingPage from "./pages/Landing";
import profilePage from "./pages/profilePage"
import ApplyJob from "./pages/ApplyJob";

function App() {
  return (
    <Switch>
        <Route path="/" exact component={landingPage} />
        <Route path="/signup" exact component={SignUp} />
        <Route path='/login' exact component={Login}/>
        <Route path="/JobBoard" exact component={SearchBar} />
        <Route path="/profile" exact component={profilePage}/>
        <Route path="/apply" exact component={ApplyJob}/>
    </Switch>
  );
}

export default App;
