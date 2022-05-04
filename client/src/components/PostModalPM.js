import React, { Fragment, useEffect, useState } from "react";


const PostModalPM = ( { p } ) => {

    const [bd, setBD] = useState(p.post_body);

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