import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";

// The NavBar is similar in functionality to the home page, but is a separate component
// which is used at the top of every page. 
// We are passing in a searchCallback because the SearchBar is contained within the NavBar
// It has to be destructured with { } or it won't work.
const NavBar = ({ searchCallback }) => {
	return (
		<Fragment>
			<nav className="d-flex my-3 mr-auto">
				<Link className="mx-2" to="/">Home</Link>
				<Link className="mx-2" to="/login">Log In</Link>
				<Link className="mx-2" to="/register">Create Account</Link>
				<div className="w-50">
					<SearchBar callback={searchCallback} />
				</div>
			</nav>
		</Fragment>
	);
}

export default NavBar;