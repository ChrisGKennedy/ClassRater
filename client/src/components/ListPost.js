import React, { Fragment, useEffect, useState } from "react";

import FlagButton from "./FlagButton";
import Voting from "./Voting";

import MakePost from "./MakePost";

// renders any posts that is associated to the course code passed in
const ListPosts = ({code, auth}) => {
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState(false);

    // fetches all posts related to the course code
    const getPosts = async(target) => {
        try {
                if(!type){
                    const response = await fetch(`https://classraterserver.herokuapp.com/posts/descriptions/code${target}`, {
                        method: "GET"
                    });

                    const jsonData = await response.json();
                    setPosts(jsonData);
                }
                else{
                    const response = await fetch(`https://classraterserver.herokuapp.com/posts/reviews/code${target}`, {
                        method: "GET"
                    });

                    const jsonData = await response.json();
                    setPosts(jsonData);
                };
        } catch (err) {
            console.error(err.message);
        }
    }

    // switches type of posts to display
    const showDesc = () => {
        setType(false);
    }

    // switches type of posts to display
    const showReview = () => {
        setType(true);
    }

    useEffect(() => {
        getPosts(code);
    }, [type, posts]);

    // renders two buttons labeled "Description" and "Reviews" to switch between the type of posts to be displayed
    // renders a table of posts associated to the current course
    // if not logged in:
        // renders a table with professor, post body, and rating
    //if logged in:
        // renders a table with professor, post body, and rating
        // each post has a flag/unflag button, upvote/unupvote button, and downvote/undownvote button with it
        // code for the flag button is found in the file "FlagButton.js"
        // code for the vote buttons is found in the file "Voting.js"
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
                                    <td>{<Voting post_id={post.post_id} code={code} type={type} setPosts={setPosts} />}</td>
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