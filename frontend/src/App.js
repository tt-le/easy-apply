import React from "react";
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
// import api from './api';

import Dummy from './pages/Dummy'

function App() {
  return (
    <Switch>
        <Route path="/" exact component={Dummy} />
      </Switch>
  );
}

export default App;
