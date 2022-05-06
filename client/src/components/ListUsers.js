import React, { Fragment, useEffect, useState } from "react";

import BanUser from "./BanUser";

// This is the component that is used on the ban page.
// This component contains the table with the information about every user.
// It contains a button in each row of the table that toggles the ban status for that user.

const ListUsers = () => {

    const [users, setUsers] = useState([]);

    //get all of the current users
    const getUsers = async () => {
        try{
            const response = await fetch("https://classraterserver.herokuapp.com/users");
            const jsonData = await response.json();

            setUsers(jsonData);
        }catch (err){
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // This returns the table with the various components of a user such as
    // ID, email, and ban status, and the button to toggle that user's ban status.

    return <Fragment>
        {" "}
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Toggle Ban</th>
            </tr>
          </thead>
          <tbody>
            {/*
              We take each user and split it up into the various components.
            */}
            {users.map(user => (
                <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.email}</td>
                    <td>
                      {/*
                        We have TRUE indicate that a user is banned
                        and FALSE indicate that a user is not banned, and
                        use the ? operator to determine what we want to appear on
                        the page given the user's current status.
                      */}
                      {(user.banned) ? "Banned":"Unbanned"}
                    </td>
                    <td>
                      {/*
                        This is the component that contains the button that
                        toggles the ban status for a given user. See BanUser.js
                      */}
                      <BanUser user = {user}/>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
    </Fragment>
};

export default ListUsers;