import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import CourseText from "./CourseText";
import ListPosts from "./ListPost";
import NavBar from "./NavBar";

const DescriptionPage = ({auth}) => {

    const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}

    const queryParams = new URLSearchParams(window.location.search);
    const course_code = queryParams.get("code")

    return(
        <Fragment>
            <NavBar searchCallback={searchHandler} />
            <CourseText code={course_code}/>
            <ListPosts code={course_code} auth={auth}/>
        </Fragment>
    )
};

export default DescriptionPage;