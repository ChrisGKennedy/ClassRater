import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import CourseText from "./CourseText";
import ListPosts from "./ListPost";
import NavBar from "./NavBar";

const DescriptionPage = ({auth}) => {

    // passes the course code into the url and reloads the page
    const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}

    // takes course code to use to pull from the database from the url
    const queryParams = new URLSearchParams(window.location.search);
    const course_code = queryParams.get("code")
    
    // renders a nav bar, course text(i.e course code, course name, and course description) and posts associated with the course
    // code for nav bar is found in file "NavBar.js"
    // code for course text is found in file "CourseText.js"
    // code for listing posts is found in file "ListPosts.js"
    return(
        <Fragment>
            <NavBar searchCallback={searchHandler} />
            <CourseText code={course_code}/>
            <ListPosts code={course_code} auth={auth}/>
        </Fragment>
    )
};

export default DescriptionPage;