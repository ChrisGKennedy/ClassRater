import React, { Fragment, useState, useEffect } from "react";

// logged in users can make a description post or review post based on the type of post is rendered
const MakePost = ({course_code, type, auth}) => {

    const [post, setPost] = useState("")
    const [prof, setProf] = useState("")
    const [user, setUser] = useState([])

    // creates post, taking information from passed in values from other components or information on input form
    const onSubmitForm = async e => {
        e.preventDefault();
        try {

            const response = await fetch("https://classrater.herokuapp.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"post_body":post, "code":course_code, "post_type": type, "user_id": user.user_id, "professor": prof})
            });

        } catch (err) {
            console.error(err.message);
        }
    }

    // gets user information for currently logged in users
    const getUserInfo = async() => {
        try {
            const respone = await fetch("https://classrater.herokuapp.com/dashboard", {
                method: "GET",
                headers: {token : localStorage.token}
            });
            const userData = await respone.json();
          
            setUser(userData);
        } catch (err) {
          console.error(err.message);
        }
      }

    useEffect(() => {
        getUserInfo()
    }, []);

    // renders text inputs form for a professor name and the post body and a button to submit the form.
    return (
        <Fragment>
            <form className="mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Professor Name"
                    value={prof}
                    onChange={e => setProf(e.target.value)}>
                </input>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Post Body"
                    value={post}
                    onChange={e => setPost(e.target.value)}>
                </input>
                <button className="btn btn-success">Post</button>
            </form>
        </Fragment>
    );

};

export default MakePost;