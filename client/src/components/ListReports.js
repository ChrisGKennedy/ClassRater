import React, { Fragment, useEffect, useState } from "react";

import PostModal from "./PostModal";

const ListReports = () => {

    const [reports, setReports] = useState([]);

    const deleteReport = async id => {
        try{
            const deleteReport = await fetch(`http://localhost:5000/flags/${id}`, {
                method: "DELETE"
            });

            setReports(reports.filter(r => r.flag_id !== id));
            window.location = "/reports";
        }catch (err){
            console.error(err.message);
        }
    };

    const getReports = async () => {
        try{
            const response = await fetch("http://localhost:5000/flags");
            const jsonData = await response.json();

            setReports(jsonData);
        }catch (err){
            console.error(err.message);
        }
    };


    useEffect(() => {
        getReports();
    }, []);

    return <Fragment>
        {" "}
        <table className="table mt-5 text-center">
          <thead>
            <tr>
              <th>Flag ID</th>
              <th>User ID</th>
              <th>Post ID</th>
              <th>Post Type</th>
              <th>Link</th>
              <th>Delete Flag</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
                    <tr key={report.flag_id}>
                        <td>{report.flag_id}</td>
                        <td>{report.user_id}</td>
                        <td>{report.post_id}</td>
                        <td>{(report.post_type) ? "Review":"Description" }</td>
                        <td>
                          <PostModal r = {report}/>
                        </td>
                        <td>
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