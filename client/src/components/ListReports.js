import React, { Fragment, useEffect, useState } from "react";

import PostModal from "./PostModal";

const ListReports = () => {

    const [reports, setReports] = useState([]);

    // deletes the flag for the given ID
    const deleteReport = async id => {
        try{
            const deleteReport = await fetch(`https://classraterserver.herokuapp.com/flags/${id}`, {
                method: "DELETE"
            });

            setReports(reports.filter(r => r.flag_id !== id));
            window.location = "/reports";
        }catch (err){
            console.error(err.message);
        }
    };

    //gets all of the  current reports
    const getReports = async () => {
        try{
            const response = await fetch("https://classraterserver.herokuapp.com/flags");
            const jsonData = await response.json();

            setReports(jsonData);
        }catch (err){
            console.error(err.message);
        }
    };


    useEffect(() => {
        getReports();
    }, []);


    // This returns the table with the various components of a flag such as
    // the flag ID, the user ID (who flagged the post), the post ID (of the post that was flagged),
    // the post body (Link)

    return <Fragment>
        {" "}
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Flag ID</th>
              <th>User ID</th>
              <th>Post ID</th>
              <th>Post Type</th>
              <th>Post Body</th>
              <th>Delete Flag</th>
            </tr>
          </thead>
          <tbody>
            {/*
              We take each report and split it up into the various components.
            */}
            {reports.map(report => (
                    <tr key={report.flag_id}>
                        <td>{report.flag_id}</td>
                        <td>{report.user_id}</td>
                        <td>{report.post_id}</td>
                        <td>
                          {/*
                            For post type, a value of TRUE indicates Review, and 
                            FALSE indicates Description, so we use the ? operator to determine
                            whether to display "Review" or "Description" on the page.
                          */}
                          {(report.post_type) ? "Review":"Description" }
                        </td>
                        <td>
                          {/* 
                            This component is a button that opens the window that displays
                            the post body for the given report. Note that this compenent is different
                            from PostModalPM as PostModalPM takes a post as a prop, while PostModal
                            takes a report (flag) as a prop.
                          */}
                          <PostModal r = {report}/>
                        </td>
                        <td>
                          {/* 
                            This is the button at the end of each row, that when clicked, deletes the given report (flag).
                          */}
                          <button 
                            className="btn btn-danger" 
                            onClick = {() => deleteReport(report.flag_id)}
                          >
                            Delete Flag
                          </button>
                        </td>
                    </tr>
                ))}
          </tbody>
        </table>
    </Fragment>
};

export default ListReports;