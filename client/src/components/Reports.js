import React, { Fragment } from "react";

import ListReports from "./ListReports";

// This is the code for the report page
// Just contains the simple description of the page
// and the ListReports component, which contains all the information
// displayed on the table on the page when you run the code

const Reports = () => {
    return (
        <div className = "container">
          <h1 className = "text-center mt-5">Reports Page</h1>
          <div className = "text-center mt-5">Listed below are all of the current flags.</div>
          <div className = "container">
              <ListReports/>
          </div>
        </div>
    );
};

export default Reports;