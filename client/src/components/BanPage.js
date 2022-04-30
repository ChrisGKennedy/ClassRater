import React, { Fragment } from "react";

import ListUsers from "./ListUsers";

const BanPage = () => {
    return (
        <div className = "container">
          <h1 className = "text-center mt-5">Ban Page</h1>
          <div className = "text-center mt-5">This is where you can ban users.</div>
          <div className = "container">
              <ListUsers/>
          </div>
        </div>
    );
};

export default BanPage;
