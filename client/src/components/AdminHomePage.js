import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import Nav from "./Nav";
import NavBar from "./NavBar";

const AdminHomePage = () => {

    const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/description?code=" + term)
	}
    return (
        <div>
          <NavBar searchCallback={searchHandler}/>
          <Nav/>
          <h1 className = "text-center mt-5">Admin Home</h1>
          <div className = "text-center mt-5">This is the admin home page.</div>
        </div>
    );
};

export default AdminHomePage;
