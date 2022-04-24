import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.js'

const HomePage = () => {

	return (
		<Fragment>
			<nav className="mt-3">
				<Link className="mx-2" to="/">Home</Link>
				<Link className="mx-2" to="/log-in">Log In</Link>
				<Link className="mx-2" to="/create-account">Create Account</Link>
			</nav>
			<div className="d-flex align-items-center justify-content-center text-center">
				<div className="col">
					<h1>Search for Classes</h1>
					<SearchBar />
				</div>
			</div>
		</Fragment>
	);
};

export default HomePage;