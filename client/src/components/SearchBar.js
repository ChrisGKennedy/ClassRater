import React, { Fragment, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';

function SearchBar({ callback }) {

	// const [searchParams, setSearchParams] = useSearchParams("");
	const [searchParams, setSearchParams] = useState("");
	// const navigate = useNavigate();

	const submitSearchForm = e => {
		e.preventDefault();
		// setSearchParams(e.target.value);
		callback(searchParams);
		// navigate("/search?q=" + searchParams);
		console.log("submitted searchParams = " + searchParams);
	};

	return (
		<Fragment>
			<form className="d-flex" onSubmit={submitSearchForm}>
				<input
					type="text"
					className="form-control"
					value={searchParams}
					onChange={e => setSearchParams(e.target.value)}
				/>
				<button className="btn btn-success">Search</button>
			</form>
		</Fragment>
	);
}

export default SearchBar;