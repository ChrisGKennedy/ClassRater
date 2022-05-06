import React, { Fragment, useEffect, useState, Component } from "react";

// displays the course code, course name, and course discription based on the course code passed in
const CourseText = ({code}) => {
    const [course, setCourse] = useState([]);

    // fetches course data from the database using the course code
    const getCourse = async (target) => {
        try {
            const response = await fetch(`https://classraterserver.herokuapp.com/courses/code${target}`,{
                method: "Get"
            });
            const jsonData = await response.json();

            setCourse(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getCourse(code);
    }, []);

    console.log(course);

    // renders the course code, course name, and course description
    return (
        <Fragment>
            <h1>{course.code}</h1>
            <h1>{course.course_name}</h1>
            <h1>{course.description}</h1>
        </Fragment>

    );
};

export default CourseText;