import React, { Fragment, useEffect, useState } from "react";

import CourseText from "./CourseText";
import ListPosts from "./ListPost";

const DescriptionPage = ({code, auth}) => {

    const queryParams = new URLSearchParams(window.location.search);
    const course_code = queryParams.get("code")

    return(
        <Fragment>
            <CourseText code={course_code}/>
            <ListPosts code={course_code} auth={auth}/>
        </Fragment>
    )
};

export default DescriptionPage;