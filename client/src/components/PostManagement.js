import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import ListPostAdmin from "./ListPostAdmin";
import Nav from "./Nav";
import NavBar from "./NavBar";

const PostManagement = () => {

    const navigate = useNavigate();

	const searchHandler = (term) => {
		navigate("/search?q=" + term)
	}

    return (
        <div className = "container">
          <NavBar searchCallback={searchHandler}/>
          <Nav/>
          <h1 className = "text-center mt-5">Post Management Page</h1>
          <div className = "text-center mt-5">This is where you can manage posts.</div>
          <div className = "container">
              <ListPostAdmin/>
          </div>
        </div>
    );
};

export default PostManagement;