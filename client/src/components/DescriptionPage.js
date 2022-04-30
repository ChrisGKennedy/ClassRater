import React, { Fragment, useEffect, useState } from "react";

import CourseText from "./CourseText";
import ListPosts from "./ListPost";

const DescriptionPage = ({code, auth}) => {
    return(
        <Fragment>
            <CourseText code={code}/>
            <ListPosts code={code} auth={auth}/>
        </Fragment>
    )
};

export default DescriptionPage;