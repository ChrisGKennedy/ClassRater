import React, { Fragment, useEffect, useState } from "react";

import PostModalPM from "./PostModalPM";

const ListPostAdmin = () => {

    const [posts, setPosts] = useState([]);

    const deletePost = async id => {
        try{
            const deletePost = await fetch(`http://localhost:5000/posts/${id}`, {
                method: "DELETE"
            });

            setPosts(posts.filter(p => p.post_id !== id));
            window.location = "/post_management";
        }catch (err){
            console.error(err.message);
        }
    };

    const getPosts = async () => {
        try{
            const response = await fetch("http://localhost:5000/posts");
            const jsonData = await response.json();

            setPosts(jsonData);
        }catch (err){
            console.error(err.message);
        }
    };


    useEffect(() => {
        getPosts();
    }, []);

    return <Fragment>
        {" "}
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Professor</th>
              <th>Post Body</th>
              <th>Code</th>
              <th>Rating</th>
              <th>User ID</th>
              <th>Post Type</th>
              <th>Delete Post</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
                    <tr key={post.post_id}>
                        <td>{post.post_id}</td>
                        <td>{post.professor}</td>
                        <td>
                          <PostModalPM p = {post}/>
                        </td>
                        <td>{post.code}</td>
                        <td>{post.rating}</td>
                        <td>{post.user_id}</td>
                        <td>{(post.post_type) ? "Review":"Description" }</td>
                        <td>
                        <button 
                            className="btn btn-danger" 
                            onClick = {() => deletePost(post.post_id)}
                        >
                            Delete Post
                        </button>
                        </td>
                    </tr>
                ))}
          </tbody>
        </table>
    </Fragment>
};

export default ListPostAdmin;