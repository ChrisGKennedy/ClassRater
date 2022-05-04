import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import ListUsers from "./ListUsers";
import Nav from "./Nav";
import NavBar from "./NavBar";

const BanPage = () => {

    const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}
    return (
        <div className = "container">
          <NavBar searchCallback={searchHandler}/>
          <Nav/>
          <h1 className = "text-center mt-5">Ban Page</h1>
          <div className = "text-center mt-5">Listed below are all of the users and their status.</div>
          <div className = "container">
              <ListUsers/>
          </div>
        </div>
    );
};

export default BanPage;
