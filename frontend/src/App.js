import React from "react";
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
// import api from './api';

import Dummy from './pages/Dummy'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function App() {
  return (
    <Switch>
        <Route path="/" exact component={Dummy} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
  );
}

export default App;
