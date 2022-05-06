import React, { Fragment, useState, useEffect } from "react";

// allows logged in user to flag and unflag a post
const FlagButton = ( {post_id, type} ) => {
    const [user, setUser] = useState([]);
    const [flag, setFlag] = useState([]);
    const [isFlag, setIsFlag] =useState(false);

    // gets info for currently logged in user and checks if they have flagged the post
    const getUserInfo = async() => {
        try {
            const respone = await fetch("https://classrater.herokuapp.com/dashboard", {
                method: "GET",
                headers: {token : localStorage.token}
            });
            const userData = await respone.json();

            console.log(userData);
            
            setUser(userData);

            const fetchFlag = await fetch(`https://classrater.herokuapp.com/flags/${post_id}/${userData.user_id}`, {
                method: "GET"
            });
            try {
                // if a flag for the post exists
                const flagInfo = await fetchFlag.json();
                setFlag(flagInfo);
                setIsFlag(true);
            } catch (err2) {
                // if a flag for the post doesn't exist
                setIsFlag(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    // creates a flag
    const makeFlag = async() => {
        try {
            const newFlag = await fetch("https://classrater.herokuapp.com/flags", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({"user_id": user.user_id, "post_id": post_id, "post_type": type})
            });

            const flagInfo = newFlag.json();
            setFlag(flagInfo);
            setIsFlag(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    // delets a flag
    const unflag = async() => {
        try {
            const deleteFlag = await fetch(`https://classrater.herokuapp.com/flags/${flag.flag_id}`, {
                method: "DELETE"
            });

            setFlag([]);
            setIsFlag(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [isFlag]);
    
    // renders a flag button if the logged in user has not flagged the post
    // renders unflag button (labeled flagged) if user has flagged a post
    return (
        <Fragment>
            { !isFlag ? 
                <button onClick={makeFlag}>Flag</button> 
                :
                <button onClick={unflag}>Flagged</button> }
        </ Fragment>
    );
}

export default FlagButton;

/* { !isFlag ? 
        <button>Flag</button> 
        :
        <button onClick={unflag}>Flagged</button> } */