import './App.css';
import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="container">
          <Switch>
            <Route path='/' exact><HomePage /></Route>
            <Route path="/log-in" exact><h1>Log in!</h1></Route>
            <Route path="/create-account" exact><h1>create account!</h1></Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
