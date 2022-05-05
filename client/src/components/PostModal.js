import React, { Fragment, useEffect, useState } from "react";

// This component is a button that opens the window that displays
// the post body for the given report. Note that this compenent is different
// from PostModalPM as PostModalPM takes a post, while PostModal
// takes a report/flag.

const PostModal = ( { r } ) => {

    const [post, setPost] = useState([]);

    // gets the flagged post (indicated by the report's post_id)
    const getPost = async () => {
        try{
            const response = await fetch(`http://localhost:5000/posts/${r.post_id}`, {
                method: "GET"
            });
            const jsonData = await response.json();

            setPost(jsonData);
        }catch(err){
            console.error(err.message);
        }
    };

    useEffect(() => {
        getPost();
    });

    // Returns the button that toggles the modal (which is the window)
    // that contains the text of the post body.
    return(
      <Fragment>
        <button 
          className="btn btn-primary" 
          data-toggle="modal" 
          data-target={`#postModal${r.flag_id}`}
        >
          Post
        </button>
        <div className = "modal" id = {`postModal${r.flag_id}`}>
          <div className = "modal-dialog">
            <div className = "modal-content">

              <div className = "modal-header">
                <h4 className = "modal-title">Post</h4>
                <button 
                  className = "close" 
                  data-dismiss = "modal"
                >
                  &times;
                </button>
              </div>

              <div className = "modal-body">
                {/*
                  gets the post body text from the post
                */}
                  {post.post_body}
              </div>

              <div className="modal-footer">
                <button 
                  className="btn btn-danger" 
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      </Fragment>
    );
};

export default PostModal;