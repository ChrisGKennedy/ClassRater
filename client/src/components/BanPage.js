import React, { Fragment } from "react";

import ListUsers from "./ListUsers";

const BanPage = () => {
    return (
        <div className = "container">
          <h1 className = "text-center mt-5">Ban Page</h1>
          <div className = "text-center mt-5">Listed below are all of the users and their status.</div>
          <div className = "container">
              <ListUsers/>
          </div>
        </div>
    );
};

export default BanPage;
