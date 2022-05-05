import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import ListPostAdmin from "./ListPostAdmin";
import Nav from "./Nav";
import NavBar from "./NavBar";

// This is the code for the Admin post management page

const PostManagement = () => {


    // This is to make the search functionality work.
	// A callback has to be passed to the SearchBar so it knows where to redirect to.
	// we use navigate() from the home page or from any page that redirects to the searchResults/coursePage. 
	// On the SearchResults page, we use useSearchParams, because it simply changes the URL and does not redirect.
    // This is used in the NavBar that appears at the top of the page.
    const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}


    // The post management page contains the general NavBar, which is the navigation bar for the whole page
    // and the Nav component, which is the navigation bar for the admin pages.
    // It also contains some information detailing what is displayed on the page.
    // It contains the ListPostAdmin component, and its functionality is detailed in its file,
    // named ListPostAdmin.js

    return (
        <div className = "container">
          <NavBar searchCallback={searchHandler}/>
          <Nav/>
          <h1 className = "text-center mt-5">Post Management Page</h1>
          <div className = "text-center mt-5">This is where you can manage posts.</div>
          <div className = "container">
              <ListPostAdmin/>
          </div>
        </div>
    );
};

export default PostManagement;