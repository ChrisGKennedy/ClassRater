import './App.css';
import React, { Fragment } from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import BanPage from './components/BanPage';
import AdminHomePage from './components/AdminHomePage';

function App() {
  return(
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route path = "/" exact component={AdminHomePage}/>
          <Route path = "/ban" exact component={BanPage}/>
          <Route path = "/page2" exact component={Page2}/>
          <Route path = "/page3" exact component={Page3}/>
        </Switch>   
      </div>
    </Router>
  );
};

export default App;
