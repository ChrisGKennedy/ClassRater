import React, { Fragment, useEffect, useState, Component } from "react";

//var testcode = "ART-4252"

const CourseText = ({code}) => {
    const [course, setCourse] = useState([]);

    const getCourse = async (target) => {
        try {
            const response = await fetch(`http://localhost:5000/courses/code${target}`,{
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

    return (
        <Fragment>
            <h1>{course.code}</h1>
            <h1>{course.course_name}</h1>
            <h1>{course.description}</h1>
        </Fragment>

    );
};

export default CourseText;