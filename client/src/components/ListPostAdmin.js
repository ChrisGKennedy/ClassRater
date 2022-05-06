import React, { Fragment, useEffect, useState } from "react";

import PostModalPM from "./PostModalPM";

// This is the component that is used on the Post Management page.
// This component contains the table with the information about every post.
// In order to make the post_body entry more concise, it has a button 
// that opens up a modal (which is a little window) that contains the post body.
// In addition to the post data, it contains a button that allows the admins
// to delete a post if they need to.

const ListPostAdmin = () => {

    const [posts, setPosts] = useState([]);

    // deletes the post with the given ID
    const deletePost = async id => {
        try{
            const deletePost = await fetch(`https://classrater.herokuapp.com/posts/${id}`, {
                method: "DELETE"
            });

            setPosts(posts.filter(p => p.post_id !== id));
            window.location = "/post_management";
        }catch (err){
            console.error(err.message);
        }
    };

    // gets all of the current posts
    const getPosts = async () => {
        try{
            const response = await fetch("https://classrater.herokuapp.com/posts");
            const jsonData = await response.json();

            setPosts(jsonData);
        }catch (err){
            console.error(err.message);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    // This returns the table with the various components of a post such as
    // Post ID, Professor, Post Body, Code, Rating, User ID (who made the post), 
    // post type, and the button to delete the given post
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
            {/*
                We take each post and split it up into the various components.
            */}
            {posts.map(post => (
                    <tr key={post.post_id}>
                        <td>{post.post_id}</td>
                        <td>{post.professor}</td>
                        <td>
                          {/* 
                            This component is a button that opens the window that displays
                            the post body for the given post 
                          */}
                          <PostModalPM p = {post}/>
                        </td>
                        <td>{post.code}</td>
                        <td>{post.rating}</td>
                        <td>{post.user_id}</td>
                        <td>
                          {/*
                            For post type, a value of TRUE indicates Review, and 
                            FALSE indicates Description, so we use the ? operator to determine
                            whether to display "Review" or "Description" on the page.
                          */}
                          {(post.post_type) ? "Review":"Description" }
                        </td>
                        <td>
                          {/* 
                            This is the button at the end of each row, that when clicked, deletes the given post.
                          */}
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