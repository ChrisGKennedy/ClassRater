import React, { Fragment, useState } from "react";

const BanUser = ({ user }) => {
    
    const [users, setUsers] = useState(user.banned);
    
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