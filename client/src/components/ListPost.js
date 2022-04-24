import React, { Fragment, useEffect, useState } from "react";

import MakePost from "./MakePost";

var type = false;

const ListPosts = ({code}) => {
    const [posts, setPosts] = useState([]);

    const getPosts = async(target) => {
        try {
                if(!type){
                    const response = await fetch(`http://localhost:5000/posts/descriptions/code${target}`, {
                        method: "GET"
                    });

                    const jsonData = await response.json();
                    setPosts(jsonData);
                }
                else{
                    const response = await fetch(`http://localhost:5000/posts/reviews/code${target}`, {
                        method: "GET"
                    });

                    const jsonData = await response.json();
                    setPosts(jsonData);
                };
        } catch (err) {
            console.error(err.message);
        }
    }

    const showDesc = () => {
        type = false;

        getPosts(code);
    }

    const showReview = () => {
        type = true;

        getPosts(code);
    }

    useEffect(() => {
        getPosts(code);
    }, []);

    return(
        <Fragment>
            <button className="btn btn-warning" onClick={showDesc}>
                Descriptions
            </button>
            <button className="btn btn-warning" onClick={showReview}>
                Reviews
            </button>

            {" "}
            <table className="table mt-5 text-center">
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
            <MakePost course_code={code} type = {type} />
        </Fragment>
    );
};

export default ListPosts;