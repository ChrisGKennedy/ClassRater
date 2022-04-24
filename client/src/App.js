import './App.css';
import React, { Fragment } from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Nav from "./components/Nav";
import BanPage from './components/BanPage';
import ReportsPage from './components/Reports'; //Reports
import AdminHomePage from './components/AdminHomePage';
import PostManagement from './components/PostManagement';

function App() {
  return(
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route path = "/" exact component={AdminHomePage}/>
          <Route path = "/ban" exact component={BanPage}/>
          <Route path = "/reports" exact component={ReportsPage}/>
          <Route path = "/post_management" exact component={PostManagement}/>
        </Switch>   
      </div>
    </Router>
  );
};

export default App;
