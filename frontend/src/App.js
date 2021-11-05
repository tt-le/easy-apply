import React from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";

// import Dummy from './pages/Dummy'
// import JobBoard from './pages/JobBoard'
import SearchBar from './Components/SearchBar';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import landingPage from "./Pages/Landing";
import profilePage from "./Pages/profilePage";
import ConfirmEmail from "./Pages/ConfirmEmail";

function App() {
  return (
    <Switch>
        <Route path="/" exact component={landingPage} />
        <Route path="/signup" exact component={SignUp} />
        <Route path='/login' exact component={Login}/>
        <Route path="/JobBoard" exact component={SearchBar} />
        <Route path="/profile" exact component={profilePage}/>
        <Route path="/confirmEmail" component={ConfirmEmail}/>
    </Switch>
  );
}

export default App;
