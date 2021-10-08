import React from "react";
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
// import api from './api';

import Dummy from './pages/Dummy'
import JobBoard from './pages/JobBoard'

function App() {
  return (
    <Switch>
        <Route path="/" exact component={Dummy} />
        <Route path="/JobBoard" exact component={JobBoard} />
    </Switch>
  );
}

export default App;
