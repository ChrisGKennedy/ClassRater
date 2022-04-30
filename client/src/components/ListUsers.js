import React, { Fragment, useEffect, useState } from "react";

const ListUsers = () => {

    const [users, setUsers] = useState([]);

    // updateBanStatus function

    const updateBanStatus = async() => {
        try{
            
        }catch(err){
            console.error(err.message);
        }
    }

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
              <th>Banned?</th>
              <th>BAN</th>
              <th>UNBAN</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
                <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.email}</td>
                    <td>{(user.banned).toString()}</td>
                    <td>
                        <button className="btn btn-danger">
                        BAN
                        </button>
                    </td>
                    <td>
                      <button className="btn btn-success">
                        UNBAN
                      </button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
    </Fragment>
};

export default ListUsers;