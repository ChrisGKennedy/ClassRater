import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<Fragment>
			<nav className="mt-3">
				<Link className="mx-2" to="/">Home</Link>
				<Link className="mx-2" to="/log-in">Log In</Link>
				<Link className="mx-2" to="/create-account">Create Account</Link>
			</nav>
		</Fragment>
	);
}

export default NavBar;