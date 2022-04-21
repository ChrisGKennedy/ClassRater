import React, { Fragment, useEffect, useState } from "react";

const ListPosts = ({code}) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async(target) => {
        try {
            const response = await fetch(`http://localhost:5000/posts/descriptions/code${target}`, {
                method: "GET"
            });
            const jsonData = await response.json();

            setPosts(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getPosts(code);
    }, []);

    return(
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Rating</th>
                    </tr>
                </thead>

                <tbody>
                    {posts.map(post => (
                        <tr>
                            <td>{post.post_body}</td>
                            <td>{post.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListPosts;