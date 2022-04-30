import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import ListReports from "./ListReports";

const Reports = () => {
    return (
        <div className = "container">
          <h1 className = "text-center mt-5">Reports Page</h1>
          <div className = "text-center mt-5">This is the reports page.</div>
          <div className = "container">
              <ListReports/>
          </div>
        </div>
    );
};

export default Reports;