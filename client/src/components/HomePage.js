import React, { Fragment } from "react";
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar.js'

const HomePage = () => {

	// This is to make the search functionality work.
	// A callback has to be passed to the SearchBar so it knows where to redirect to.
	// we use navigate() from the home page or from any page that redirects to the searchResults/coursePage. 
	// On the SearchResults page, we use useSearchParams, because it simply changes the URL and does not redirect.
	const navigate = useNavigate();
	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}

	return (
		<Fragment>
			<nav className="mt-3">
				<Link className="mx-2" to="/">Home</Link>
				<Link className="mx-2" to="/login">Log In</Link>
				<Link className="mx-2" to="/register">Create Account</Link>
			</nav>
			{/* This div has a lot of classes for formatting and centering the component. */}
			<div className="d-flex align-items-center justify-content-center text-center">
				<div className="col">
					<h1>Search for Classes</h1>
					<div className="mt-5">
						{/* Pass in the callback defined above */}
						<SearchBar callback={searchHandler} />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default HomePage;