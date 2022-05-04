import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Nav(){
    return (
        <Fragment>
            <div>
                <div className = "nav-links">
                    <button className = "btn btn-outline-dark">
                        <Link to = "/"> Home </Link>
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