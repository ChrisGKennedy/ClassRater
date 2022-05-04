import './App.css';
import React, { Fragment } from "react";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

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
        <Routes>
          <Route path = "/" element={<AdminHomePage/>}/>
          <Route path = "/ban" element={<BanPage/>}/>
          <Route path = "/reports" element={<ReportsPage/>}/>
          <Route path = "/post_management" element={<PostManagement/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
