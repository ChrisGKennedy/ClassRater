import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import Nav from "./Nav";
import NavBar from "./NavBar";

// This is the code for the Admin home page

const AdminHomePage = () => {


    // This is to make the search functionality work.
	// A callback has to be passed to the SearchBar so it knows where to redirect to.
	// we use navigate() from the home page or from any page that redirects to the searchResults/coursePage. 
	// On the SearchResults page, we use useSearchParams, because it simply changes the URL and does not redirect.
    // This is used in the NavBar that appears at the top of the page.
    const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}

    // The Admin home page simply contains the general NavBar
    // and the Nav component, which is the navigation bar for the admin pages.
    // It also contains some text indicating that it is the home page.
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
