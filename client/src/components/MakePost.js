import React, { Fragment, useState, useEffect } from "react";

const MakePost = ({course_code, type, auth}) => {

    const [post, setPost] = useState("")
    const [prof, setProf] = useState("")
    const [user, setUser] = useState([])

    const onSubmitForm = async e => {
        e.preventDefault();
        try {

            const response = await fetch("http://localhost:5000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"post_body":post, "code":course_code, "post_type": type, "user_id": user.user_id, "professor": prof})
            });

        } catch (err) {
            console.error(err.message);
        }
    }

    const getUserInfo = async() => {
        try {
            const respone = await fetch("http://localhost:5000/dashboard", {
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