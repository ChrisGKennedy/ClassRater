import React, { Fragment } from "react";

import ListPostAdmin from "./ListPostAdmin";

const PostManagement = () => {
    return (
        <div className = "container">
          <h1 className = "text-center mt-5">Post Management Page</h1>
          <div className = "text-center mt-5">This is where you can manage posts.</div>
          <div className = "container">
              <ListPostAdmin/>
          </div>
        </div>
    );
};

export default PostManagement;