import React, { Fragment, useEffect, useState } from "react";
import FlagButton from "./FlagButton";

import MakePost from "./MakePost";

const ListPosts = ({code, auth}) => {
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState(false);

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
        setType(false);
    }

    const showReview = () => {
        setType(true);
    }

    useEffect(() => {
        getPosts(code);
    }, [type]);

    return(
        <Fragment>
            <button className="btn btn-warning" onClick={showDesc}>
                Descriptions
            </button>
            <button className="btn btn-warning" onClick={showReview}>
                Reviews
            </button>

            {" "}
            {auth ?
                <div>
                    <table className="table mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Flag</th>
                                <th>Professor</th>
                                <th>Description</th>
                                <th>Rating</th>
                            </tr>
                        </thead>

                        <tbody>
                            {posts.map(post => (
                                <tr key={post.post_id}>
                                    <td>
                                        <FlagButton post_id={post.post_id} type={type} />
                                    </td>
                                    <td>{post.professor}</td>
                                    <td>{post.post_body}</td>
                                    <td>{post.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <MakePost course_code={code} type={type} auth={auth} />
                </div>
            :
                <div>
                    <table className="table mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Professor</th>
                                <th>Description</th>
                                <th>Rating</th>
                            </tr>
                        </thead>

                        <tbody>
                            {posts.map(post => (
                                <tr key={post.post_id}>
                                    <td>{post.professor}</td>
                                    <td>{post.post_body}</td>
                                    <td>{post.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </Fragment>
    );
};

export default ListPosts;

//<FlagButton post={post.post_id} type={type} />