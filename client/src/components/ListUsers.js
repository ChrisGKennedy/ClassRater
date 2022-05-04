import React, { Fragment, useEffect, useState } from "react";

import BanUser from "./BanUser";

const ListUsers = () => {

    const [users, setUsers] = useState([]);

    //get users
    const getUsers = async () => {
        try{
            const response = await fetch("http://localhost:5000/users");
            const jsonData = await response.json();

            setUsers(jsonData);
        }catch (err){
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

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
            {users.map(user => (
                <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.email}</td>
                    <td>{(user.banned) ? "Banned":"Unbanned"}</td>
                    <td>
                        <BanUser user = {user}/>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
    </Fragment>
};

export default ListUsers;