import React, { Fragment } from "react";
import './App.css';

import CourseText from "./components/CourseText";
import ListPosts from "./components/ListPost";
import MakePost from "./components/MakePost";

var testcode = "ART-4252"

function App() {
  return (
    <Fragment>
      <div className="container">
        <CourseText code={testcode} />
        <ListPosts code={testcode} />
        <MakePost course_code={testcode} />
      </div>
    </Fragment>
  );
}

export default App;
