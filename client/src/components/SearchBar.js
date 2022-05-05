import React, { Fragment, useState } from "react";

// We have the destructuring { } or else it won't work.
function SearchBar({ callback }) {

	// This is the function that runs when the search button/enter is pressed
	// It calls the callback that is passed in above.
	const [searchParams, setSearchParams] = useState("");
	const submitSearchForm = e => {
		e.preventDefault();
		callback(searchParams);
		console.log("submitted searchParams = " + searchParams);
	};

	return (
		<Fragment>
			{/* Pass in the onSubmit submitSearchForm defined above */}
			<form className="d-flex" onSubmit={submitSearchForm}>
				<input
					type="text"
					className="form-control"
					// The value of the textbox is the search term.
					value={searchParams}
					onChange={e => setSearchParams(e.target.value)}
				/>
				<button className="btn btn-success">Search</button>
			</form>
		</Fragment>
	);
}

export default SearchBar;