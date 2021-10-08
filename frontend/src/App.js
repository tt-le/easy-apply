import React from "react";
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
// import api from './api';

import Dummy from './pages/Dummy'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Switch>
        <Route path="/" exact component={Dummy} />
        <Route path="/Dashboard" exact component={Dashboard} /> 
      </Switch>
  );
}

export default App;
