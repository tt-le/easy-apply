import React from "react";
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
// import api from './api';

import Dummy from './pages/Dummy'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import landingPage from "./pages/Landing";

function App() {
  return (
    <Switch>
        <Route path="/" exact component={landingPage} />
        <Route path="/signup" exact component={SignUp} />
        <Route path='/login' exact component={Login}/>
      </Switch>
  );
}

export default App;
