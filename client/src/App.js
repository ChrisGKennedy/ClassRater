import './App.css';
import React from "react";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/log-in" element={<h1>Log in!</h1>} />
          <Route path="/create-account" element={<h1>Create account!</h1>} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
