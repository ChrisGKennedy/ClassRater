import React, { Fragment, useEffect, useState } from "react";

// This component is a button that opens the window that displays
// the post body for the given post. Note that this compenent is different
// from PostModal as PostModal takes a report/flag, while PostModalPM
// takes a post.
const PostModalPM = ( { p } ) => {

    const [bd, setBD] = useState(p.post_body);

    // Returns the button that toggles the modal (which is the window)
    // that contains the text of the post body.
    return(
      <Fragment>
        <button 
          className="btn btn-primary" 
          data-toggle="modal" 
          data-target={`#postModalPM${p.post_id}`}
        >
          Post
        </button>
        <div className = "modal" id = {`postModalPM${p.post_id}`}>
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
                  This simply gives the body text, as bd contains the info of p.post_body
                */}
                <p>{bd}</p>
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

export default PostModalPM;