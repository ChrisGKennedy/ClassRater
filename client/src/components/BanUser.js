import React, { Fragment, useState } from "react";

const BanUser = ({ user }) => {
    
    const [users, setUsers] = useState(user.banned);
    
    // This simply updates the ban status
    // Ban is boolean value, so this function simply inverts it
    // Takes the info from the given user and puts a new user with the same id
    // and simply updates the ban status
    const updateStatusBanned = async e => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:5000/users/${user.user_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"user_id":user.user_id, 
                                      "email":user.email, 
                                      "password": user.password,
                                      "banned":!user.banned})
            });

            window.location = "/ban";
        }catch(err){
            console.error(err.message);
        }
    }

    // Returns the button that uses this update status
    // The button just updates the ban status onClick

    return <Fragment>
        <button 
          type="button" 
          className="btn btn-danger" 
          data-target={`#id${user.user_id}`}
          onClick = {e => updateStatusBanned(e)}
        >
          TOGGLE BAN
        </button>
    
    </Fragment>
};

export default BanUser;