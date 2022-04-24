import React, { Fragment } from "react";
import { useParams } from 'react-router-dom';

const SearchBar = () => {

	const [searchParams, setSearchParams] = useParams();

	const submitSearchForm = async e => {
		e.preventDefault();
		// let formData = new FormData(e.target.value);
		// let newCourse = formData.get("course");
		// setSearchParams({course: newCourse});
		console.log("submitted value " + searchParams);
	};

	return (
		<Fragment>
			<form className="d-flex mt-5" onSubmit={submitSearchForm}>
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