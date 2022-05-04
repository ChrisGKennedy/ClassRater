import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import ListReports from "./ListReports";
import Nav from "./Nav";
import NavBar from "./NavBar";

// This is the code for the report page
// Just contains the simple description of the page
// and the ListReports component, which contains all the information
// displayed on the table on the page when you run the code

const Reports = () => {
    const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}

    return (
        <div className = "container">
          <NavBar searchCallback={searchHandler} />
          <Nav/>
          <h1 className = "text-center mt-5">Reports Page</h1>
          <div className = "text-center mt-5">Listed below are all of the current flags.</div>
          <div className = "container">
              <ListReports/>
          </div>
        </div>
    );
};

export default Reports;