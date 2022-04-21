import React, { Fragment, useState } from "react";

const MakePost = ({course_code}) => {

    const [post, setPost] = useState("")

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"post_body":post, "code":course_code, "post_type": false})
            });

            window.location = "/"
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={post}
                    onChange={e => setPost(e.target.value)}>
                </input>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );

};

export default MakePost;