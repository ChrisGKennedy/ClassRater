import React, { Fragment, useState, useEffect } from "react";
import './App.css';

import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import DescriptionPage from "./components/DescriptionPage";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import BanPage from './components/BanPage';
import ReportsPage from './components/Reports';
import AdminHomePage from './components/AdminHomePage';
import PostManagement from './components/PostManagement';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setAuthenticated(boolean);
  };

  const isAuth = async() => {
    try {
      
      const respone = await fetch("https://classrater.herokuapp.com/auth/isverified", {
        method: "GET",
        headers: {token : localStorage.token}
      });

      const parseRes = await respone.json();
      
      parseRes === true ? setAuth(true) : setAuth(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  }, []);

  return (
    <Fragment>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/dashboard" /> } />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login" /> } />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/description" element={
                <div>
                  <DescriptionPage auth={isAuthenticated}/>
                </div>} />
            <Route path = "/admin" element={<AdminHomePage/>}/>
            <Route path = "/ban" element={<BanPage/>}/>
            <Route path = "/reports" element={<ReportsPage/>}/>
            <Route path = "/post_management" element={<PostManagement/>}/>
            <Route path="*" element = {<h1>404</h1>} />
          </Routes>
      </Router>
  </Fragment>
    
  );
}

export default App;
