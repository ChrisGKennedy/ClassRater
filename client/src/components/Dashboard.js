import React, { Fragment, useState, useEffect } from "react";

const Dashboard = ( { setAuth } ) => {

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    useEffect(() => {

    }, []);

    return(
        <Fragment>
            <h1>Dashboard</h1>
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
        </Fragment>
    )
}

export default Dashboard;