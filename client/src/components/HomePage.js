import React, { Fragment } from "react";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from "./NavBar.js";
import SearchBar from './SearchBar.js'

const HomePage = () => {
	const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}

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
					<div className="mt-5">
						<SearchBar callback={searchHandler} />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default HomePage;