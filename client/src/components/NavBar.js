import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";

const NavBar = ({ searchCallback }) => {
	return (
		<Fragment>
			<nav className="d-flex my-3 mr-auto">
				<Link className="mx-2" to="/">Home</Link>
				<Link className="mx-2" to="/log-in">Log In</Link>
				<Link className="mx-2" to="/create-account">Create Account</Link>
				<div className="w-50">
					<SearchBar callback={searchCallback} />
				</div>
			</nav>
		</Fragment>
	);
}

export default NavBar;