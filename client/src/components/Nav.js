import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// This is the nav bar for the admin pages.
// It appears at the top of the page (right under the main NavBar)
// if you are an admin.

function Nav(){
    return (
        <Fragment>
            <div>
                <div className = "nav-links">
                    <button className = "btn btn-outline-dark">
                        <Link to = "/admin"> Admin Home </Link>
                    </button>
                    <button className = "btn btn-outline-dark">
                        <Link to = "/ban"> Ban </Link>
                    </button>
                    <button className = "btn btn-outline-dark">
                        <Link to = "/reports"> Reports </Link>
                    </button>
                    <button className = "btn btn-outline-dark">
                        <Link to = "/post_management"> Post Management </Link>
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

export default Nav;