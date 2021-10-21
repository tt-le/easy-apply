import React from "react";
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
// import api from './api';

import Dummy from './pages/Dummy'
import JobBoard from './pages/JobBoard'
import SearchBar from './Components/SearchBar'

function App() {
  return (
    <Switch>
        <Route path="/" exact component={Dummy} />
        <Route path="/JobBoard" exact component={SearchBar} />
    </Switch>
  );
}

export default App;
