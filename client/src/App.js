import React, { Fragment, useState, useEffect } from "react";
import './App.css';

import CourseText from "./components/CourseText";
import ListPosts from "./components/ListPost";
import MakePost from "./components/MakePost";
import DescriptionPage from "./components/DescriptionPage";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server"

var testcode = ""



function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setAuthenticated(boolean);
  };

  const isAuth = async() => {
    try {
      
      const respone = await fetch("http://localhost:5000/auth/isverified", {
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
  });

  return (
    <Fragment>
      <Router>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/dashboard" /> } />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login" /> } />
            <Route path="/description" element={
                <div>
                  <DescriptionPage code={testcode} auth={isAuthenticated}/>
                </div>} />
            <Route path="*" element = {<h1>404</h1>} />
          </Routes>
      </Router>
  </Fragment>
    
  );
}

/*
  <Fragment>
      <div className="container">
          { isAuthenticated 
            ? <Dashboard setAuth={setAuth} />
            : <div className>
                <Register setAuth={setAuth} />
                <Login setAuth={setAuth} />
              </div>
          }
          <CourseText code={testcode} />
          <ListPosts code={testcode} />
      </div>
    </Fragment>
*/

/*
  <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="description">
              <CourseText code={testcode} />
              <ListPosts code={testcode} />
            </Route>
          </Routes>
        </div>
      </Router>
  </Fragment>
*/

export default App;
