import React, { Fragment, useState, useEffect } from "react";

const FlagButton = ( {post_id, type} ) => {
    const [user, setUser] = useState([]);
    const [flag, setFlag] = useState([]);
    const [isFlag, setIsFlag] =useState(false);

    const getUserInfo = async() => {
        try {
            const respone = await fetch("http://localhost:5000/dashboard", {
                method: "GET",
                headers: {token : localStorage.token}
            });
            const userData = await respone.json();

            console.log(userData);
            
            setUser(userData);

            const fetchFlag = await fetch(`http://localhost:5000/flags/${post_id}/${userData.user_id}`, {
                method: "GET"
            });
            try {
                const flagInfo = await fetchFlag.json();
                setFlag(flagInfo);
                setIsFlag(true);
            } catch (err2) {
                console.log("no flag");
                setIsFlag(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const makeFlag = async() => {
        try {
            const newFlag = await fetch("http://localhost:5000/flags", {
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

    const unflag = async() => {
        try {
            const deleteFlag = await fetch(`http://localhost:5000/flags/${flag.flag_id}`, {
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