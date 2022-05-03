import React, { Fragment, useState, useEffect } from "react";

const Voting = ({ post_id, code, type, setPosts }) => {
    const [user, setUser] = useState([]);
    const [vote, setVote] = useState([]);

    const [isUp, setIsUp] = useState(false);
    const [isDown, setIsDown] = useState(false);

    const getUserInfo = async() => {
        try {
            const respone = await fetch("http://localhost:5000/dashboard", {
                method: "GET",
                headers: {token : localStorage.token}
            });
            const userData = await respone.json();
            
            setUser(userData);

            const fetchVote = await fetch(`http://localhost:5000/votes/${post_id}/${userData.user_id}`, {
                method: "GET"
            });
            try {
                const voteInfo = await fetchVote.json();
                setVote(voteInfo);
                console.log(voteInfo);
                if(!voteInfo.vote){
                    setIsUp(true);
                    setIsDown(false);
                }
                else{
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

    const upVote = async() => {
        try {
            const oldVote = await fetch(`http://localhost:5000/votes/${post_id}/${user.user_id}`);
            try {
                const oldVoteInfo = await oldVote.json();
                console.log(oldVoteInfo.vote);

                if(!oldVoteInfo.vote){
                    const newVote = await fetch("http://localhost:5000/votes", {
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({"user_id": user.user_id, "post_id": post_id, "vote": false})
                    });

                    const voteInfo = newVote.json();
                    setVote(voteInfo);
                    setIsUp(true);
                    setIsDown(false);

                    const updatePost = await fetch(`http://localhost:5000/posts/increment/${post_id}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"}
                    });

                    if(!type){
                        const updatedPost = await fetch(`http://localhost:5000/posts/descriptions/code${code}`, {
                            method: "GET"
                        });

                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                    else{
                        const updatedPost = await fetch(`http://localhost:5000/posts/reviews/code${code}`, {
                            method: "GET"
                        });
                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }

                }
                else{
                    const editVote = await fetch(`http://localhost:5000/votes/${oldVoteInfo.vote_id}`, {
                        method: "PUT",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({"vote":false})
                    });

                    const newVote = await fetch(`http://localhost:5000/votes/${post_id}/${user.user_id}`, {
                        method: "GET"
                    });
                    
                    const voteInfo = newVote.json();
                    setVote(voteInfo);
                    setIsUp(true);
                    setIsDown(false);

                    const updatePost = await fetch(`http://localhost:5000/posts/increment2/${post_id}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"}
                    });

                    if(!type){
                        const updatedPost = await fetch(`http://localhost:5000/posts/descriptions/code${code}`, {
                            method: "GET"
                        });

                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                    else{
                        const updatedPost = await fetch(`http://localhost:5000/posts/reviews/code${code}`, {
                            method: "GET"
                        });
                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                }
                
            } catch (err2) {
                const newVote = await fetch("http://localhost:5000/votes", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({"user_id": user.user_id, "post_id": post_id, "vote": false})
                });

                const voteInfo = newVote.json();
                setVote(voteInfo);
                setIsUp(true);
                setIsDown(false);

                const updatePost = await fetch(`http://localhost:5000/posts/increment/${post_id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"}
                });

                if(!type){
                    const updatedPost = await fetch(`http://localhost:5000/posts/descriptions/code${code}`, {
                        method: "GET"
                    });

                    const postData = await updatedPost.json();
                    setPosts(postData);
                }
                else{
                    const updatedPost = await fetch(`http://localhost:5000/posts/reviews/code${code}`, {
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

    const unUpVote = async() => {
        try {
            const deleteFlag = await fetch(`http://localhost:5000/votes/${vote.vote_id}`, {
                method: "DELETE"
            });

            setVote([]);
            setIsUp(false);
            setIsDown(false);

            const updatePost = await fetch(`http://localhost:5000/posts/decrement/${post_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"}
            });

            if(!type){
                const updatedPost = await fetch(`http://localhost:5000/posts/descriptions/code${code}`, {
                    method: "GET"
                });

                const postData = await updatedPost.json();
                setPosts(postData);
            }
            else{
                const updatedPost = await fetch(`http://localhost:5000/posts/reviews/code${code}`, {
                    method: "GET"
                });
                const postData = await updatedPost.json();
                setPosts(postData);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const downVote = async() => {
        try {
            const oldVote = await fetch(`http://localhost:5000/votes/${post_id}/${user.user_id}`);
            try {
                const oldVoteInfo = await oldVote.json();
                console.log(oldVoteInfo.vote);

                if(oldVoteInfo.vote){
                    const newVote = await fetch("http://localhost:5000/votes", {
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({"user_id": user.user_id, "post_id": post_id, "vote": true})
                    });

                    const voteInfo = newVote.json();
                    setVote(voteInfo);
                    setIsUp(false);
                    setIsDown(true);

                    const updatePost = await fetch(`http://localhost:5000/posts/decrement/${post_id}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"}
                    });

                    if(!type){
                        const updatedPost = await fetch(`http://localhost:5000/posts/descriptions/code${code}`, {
                            method: "GET"
                        });

                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                    else{
                        const updatedPost = await fetch(`http://localhost:5000/posts/reviews/code${code}`, {
                            method: "GET"
                        });
                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                }
                else{
                    const editVote = await fetch(`http://localhost:5000/votes/${oldVoteInfo.vote_id}`, {
                        method: "PUT",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({"vote":true})
                    });

                    const newVote = await fetch(`http://localhost:5000/votes/${post_id}/${user.user_id}`, {
                        method: "GET"
                    });
                    
                    const voteInfo = newVote.json();
                    setVote(voteInfo);
                    setIsUp(false);
                    setIsDown(true);

                    const updatePost = await fetch(`http://localhost:5000/posts/decrement2/${post_id}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"}
                    });

                    if(!type){
                        const updatedPost = await fetch(`http://localhost:5000/posts/descriptions/code${code}`, {
                            method: "GET"
                        });

                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                    else{
                        const updatedPost = await fetch(`http://localhost:5000/posts/reviews/code${code}`, {
                            method: "GET"
                        });
                        const postData = await updatedPost.json();
                        setPosts(postData);
                    }
                }
                
            } catch (err2) {
                const newVote = await fetch("http://localhost:5000/votes", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({"user_id": user.user_id, "post_id": post_id, "vote": true})
                });

                const voteInfo = newVote.json();
                setVote(voteInfo);
                setIsUp(false);
                setIsDown(true);

                const updatePost = await fetch(`http://localhost:5000/posts/decrement/${post_id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"}
                });

                if(!type){
                    const updatedPost = await fetch(`http://localhost:5000/posts/descriptions/code${code}`, {
                        method: "GET"
                    });

                    const postData = await updatedPost.json();
                    setPosts(postData);
                }
                else{
                    const updatedPost = await fetch(`http://localhost:5000/posts/reviews/code${code}`, {
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

    const unDownVote = async() => {
        try {
            const deleteFlag = await fetch(`http://localhost:5000/votes/${vote.vote_id}`, {
                method: "DELETE"
            });

            setVote([]);
            setIsUp(false);
            setIsDown(false);

            const updatePost = await fetch(`http://localhost:5000/posts/increment/${post_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"}
            });

            if(!type){
                const updatedPost = await fetch(`http://localhost:5000/posts/descriptions/code${code}`, {
                    method: "GET"
                });

                const postData = await updatedPost.json();
                setPosts(postData);
            }
            else{
                const updatedPost = await fetch(`http://localhost:5000/posts/reviews/code${code}`, {
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