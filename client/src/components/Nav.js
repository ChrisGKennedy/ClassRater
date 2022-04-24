import React from 'react';
import { Link } from 'react-router-dom';

function Nav(){
    return (
        <nav>
            <u1 className = "nav-links">
                <Link to = "/"> Home </Link>
                <Link to = "/ban"> Ban </Link>
                <Link to = "/reports"> Reports </Link>
                <Link to = "/post_management"> Post Management </Link>
            </u1>
        </nav>
    );
}

export default Nav;

/*
<Link to = "/"> Home </Link>
<Link to = "/ban"> Ban </Link>
<Link to = "/page1"> Page2 </Link>
<Link to = "/page2"> Page3 </Link>
*/