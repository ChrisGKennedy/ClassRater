import React, { Fragment } from "react";

import ListReports from "./ListReports";

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