import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import ListUsers from "./ListUsers";
import Nav from "./Nav";
import NavBar from "./NavBar";

// This is the code for the Admin ban page

const BanPage = () => {


    // This is to make the search functionality work.
	// A callback has to be passed to the SearchBar so it knows where to redirect to.
	// we use navigate() from the home page or from any page that redirects to the searchResults/coursePage. 
	// On the SearchResults page, we use useSearchParams, because it simply changes the URL and does not redirect.
    // This is used in the NavBar that appears at the top of the page.
    const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}

    // The ban page contains the general NavBar, which is the navigation bar for the whole page
    // and the Nav component, which is the navigation bar for the admin pages.
    // It also contains some information detailing what is displayed on the page.
    // It contains the ListUsers component, and its functionality is detailed in its file,
    // named ListUsers.js

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
