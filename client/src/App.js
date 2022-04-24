import React, { Fragment, useState, useEffect } from "react";
import './App.css';

import CourseText from "./components/CourseText";
import ListPosts from "./components/ListPost";
import MakePost from "./components/MakePost";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";

var testcode = "ART-4252"



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
    
  );
}

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
