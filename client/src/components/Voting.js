import React, { Fragment, useState, useEffect } from "react";

// a user can upvote and downvote a post
const Voting = ({ post_id, code, type, setPosts }) => {
    const [user, setUser] = useState([]);
    const [vote, setVote] = useState([]);

    const [isUp, setIsUp] = useState(false);
    const [isDown, setIsDown] = useState(false);

    // gets user data and vote if a vote already exists
    const getUserInfo = async() => {
        try {
            const respone = await fetch("https://classraterserver.herokuapp.com/dashboard", {
                method: "GET",
                headers: {token : localStorage.token}
            });
            const userData = await respone.json();
            
            setUser(userData);

            const fetchVote = await fetch(`https://classraterserver.herokuapp.com/votes/${post_id}/${userData.user_id}`, {
                method: "GET"
            });
            try {
                // if a vote exists
                const voteInfo = await fetchVote.json();
                setVote(voteInfo);
                console.log(voteInfo);
                if(!voteInfo.vote){
                    // if the existing vote is an upvote
                    setIsUp(true);
                    setIsDown(false);
                }
                else{
                    // if the existing vote is a downvote
                    setIsUp(false);
                    setIsDown(true);
                }
            } catch (err2) {
                console.log(fetchVote);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    // upvotes a post
    const upVote = async() => {
        try {
            const oldVote = await fetch(`https://classraterserver.herokuapp.com/votes/${post_id}/${user.user_id}`);
            try {
                // if a post is already voted get the vote
                const oldVoteInfo = await oldVote.json();
                console.log(oldVoteInfo.vote);

                if(!oldVoteInfo.vote){
                    // if the existing vote is an upvote
                    // shouldn't really ever happen
                    // don't crucify me for this
                    const newVote = await fetch("https://classraterserver.herokuapp.com/votes", {
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({"user_id": user.user_id, "post_id": post_id, "vote": false})
                    });

                    // update vote states
                    const voteInfo = newVote.json();
                    setVote(voteInfo);
                    setIsUp(true);
                    setIsDown(false);

                    // increment rating of the post by 1
                    const updateRating = await fetch(`https://classraterserver.herokuapp.com/posts/increment/${post_id}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"}
                    });

                    // updates posts to display since we updated the rating
                    if(!type){
                        const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/descriptions/code${code}`, {
                            method: "GET"
                        });

                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                    else{
                        const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/reviews/code${code}`, {
                            method: "GET"
                        });
                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }

                }
                else{
                    // if the existing vote is a down vote, update the vote to be an upvote
                    const editVote = await fetch(`https://classraterserver.herokuapp.com/votes/${oldVoteInfo.vote_id}`, {
                        method: "PUT",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({"vote":false})
                    });

                    const newVote = await fetch(`https://classraterserver.herokuapp.com/votes/${post_id}/${user.user_id}`, {
                        method: "GET"
                    });
                    
                    // update vote state
                    const voteInfo = newVote.json();
                    setVote(voteInfo);
                    setIsUp(true);
                    setIsDown(false);

                    // increment rating by 2 since we're changing a downvote to an upvote
                    const updateRating = await fetch(`https://classraterserver.herokuapp.com/posts/increment2/${post_id}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"}
                    });

                    // updates posts to display since we updated the rating
                    if(!type){
                        const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/descriptions/code${code}`, {
                            method: "GET"
                        });

                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                    else{
                        const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/reviews/code${code}`, {
                            method: "GET"
                        });
                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                }
                
            } catch (err2) {
                // if there is no vote previously made, create a new one
                const newVote = await fetch("https://classraterserver.herokuapp.com/votes", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({"user_id": user.user_id, "post_id": post_id, "vote": false})
                });

                const voteInfo = newVote.json();
                setVote(voteInfo);
                setIsUp(true);
                setIsDown(false);

                // increment rating of the post by 1
                const updateRating = await fetch(`https://classraterserver.herokuapp.com/posts/increment/${post_id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"}
                });

                // updates posts to display since we updated the rating
                if(!type){
                    const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/descriptions/code${code}`, {
                        method: "GET"
                    });

                    const postData = await updatedPost.json();
                    setPosts(postData);
                }
                else{
                    const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/reviews/code${code}`, {
                        method: "GET"
                    });
                    const postData = await updatedPost.json();
                    setPosts(postData);
                }
            }
            
        } catch (err) {
            console.error(err.message);
        }
    }

    // deletes an upvote
    const unUpVote = async() => {
        try {
            const deleteVote = await fetch(`https://classraterserver.herokuapp.com/votes/${vote.vote_id}`, {
                method: "DELETE"
            });

            setVote([]);
            setIsUp(false);
            setIsDown(false);

            // decrement rating of post by 1
            const updateRating = await fetch(`https://classraterserver.herokuapp.com/posts/decrement/${post_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"}
            });

            // updates posts to display since we updated the rating
            if(!type){
                const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/descriptions/code${code}`, {
                    method: "GET"
                });

                const postData = await updatedPost.json();
                setPosts(postData);
            }
            else{
                const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/reviews/code${code}`, {
                    method: "GET"
                });
                const postData = await updatedPost.json();
                setPosts(postData);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    // downvotes a post
    const downVote = async() => {
        try {
            const oldVote = await fetch(`https://classraterserver.herokuapp.com/votes/${post_id}/${user.user_id}`);
            try {
                // if a vote already exists get it here
                const oldVoteInfo = await oldVote.json();
                console.log(oldVoteInfo.vote);

                if(oldVoteInfo.vote){
                    // if the existing vote is a downvote
                    // shouldn't ever happen
                    // don't crucify me for this
                    const newVote = await fetch("https://classraterserver.herokuapp.com/votes", {
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({"user_id": user.user_id, "post_id": post_id, "vote": true})
                    });

                    // update vote states
                    const voteInfo = newVote.json();
                    setVote(voteInfo);
                    setIsUp(false);
                    setIsDown(true);

                    // decrement rating of post by 1
                    const updateRating = await fetch(`https://classraterserver.herokuapp.com/posts/decrement/${post_id}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"}
                    });

                    // updates posts to display since we updated the rating
                    if(!type){
                        const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/descriptions/code${code}`, {
                            method: "GET"
                        });

                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                    else{
                        const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/reviews/code${code}`, {
                            method: "GET"
                        });
                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                }
                else{
                    // if existing vote is an upvote
                    const editVote = await fetch(`https://classraterserver.herokuapp.com/votes/${oldVoteInfo.vote_id}`, {
                        method: "PUT",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({"vote":true})
                    });

                    const newVote = await fetch(`https://classraterserver.herokuapp.com/votes/${post_id}/${user.user_id}`, {
                        method: "GET"
                    });
                    
                    // update vote state
                    const voteInfo = newVote.json();
                    setVote(voteInfo);
                    setIsUp(false);
                    setIsDown(true);

                    // decrement rating of post by 2 sincer we're changing an upvote to a downvote
                    const updateRating = await fetch(`https://classraterserver.herokuapp.com/posts/decrement2/${post_id}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"}
                    });

                    // updates posts to display since we updated the rating
                    if(!type){
                        const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/descriptions/code${code}`, {
                            method: "GET"
                        });

                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                    else{
                        const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/reviews/code${code}`, {
                            method: "GET"
                        });
                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                }
                
            } catch (err2) {
                // if no vote exists create a new vote
                const newVote = await fetch("https://classraterserver.herokuapp.com/votes", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({"user_id": user.user_id, "post_id": post_id, "vote": true})
                });

                // update vote states
                const voteInfo = newVote.json();
                setVote(voteInfo);
                setIsUp(false);
                setIsDown(true);

                // decrement rating of post by 1
                const updateRating = await fetch(`https://classraterserver.herokuapp.com/posts/decrement/${post_id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"}
                });

                // updates posts to display since we updated the rating
                if(!type){
                    const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/descriptions/code${code}`, {
                        method: "GET"
                    });

                    const postData = await updatedPost.json();
                    setPosts(postData);
                }
                else{
                    const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/reviews/code${code}`, {
                        method: "GET"
                    });
                    const postData = await updatedPost.json();
                    setPosts(postData);
                }
            }
            
        } catch (err) {
            console.error(err.message);
        }
    }

    // delete vote if already downvoted
    const unDownVote = async() => {
        try {
            const deleteVote = await fetch(`https://classraterserver.herokuapp.com/votes/${vote.vote_id}`, {
                method: "DELETE"
            });

            // update vote states
            setVote([]);
            setIsUp(false);
            setIsDown(false);

            // increment rating of post by 1 since we're deleting a downvote
            const updateRating = await fetch(`https://classraterserver.herokuapp.com/posts/increment/${post_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"}
            });

            // update posts to display since we updated rating
            if(!type){
                const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/descriptions/code${code}`, {
                    method: "GET"
                });

                const postData = await updatedPost.json();
                setPosts(postData);
            }
            else{
                const updatedPost = await fetch(`https://classraterserver.herokuapp.com/posts/reviews/code${code}`, {
                    method: "GET"
                });
                const postData = await updatedPost.json();
                setPosts(postData);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [isUp, isDown]);

    // render upvote button if a post is not upvoted and render un-upvote button if post is upvoted
    // render downvote button if a post is not downvoted and render un-downvote button if post is downvoted
    return(
        <Fragment>
            {!isUp ? 
            <button className="btn btn-warning" onClick={upVote}>UpVote</button>
            :
            <button className="btn btn-warning" onClick={unUpVote}>Un-UpVote</button>}
            {!isDown ?
            <button className="btn btn-danger mx-3" onClick={downVote}>DownVote</button>
            :
            <button className="btn btn-danger mx-3" onClick={unDownVote}>Un-DownVote</button>}
        </Fragment>
    );
};

export default Voting;