import React, { Fragment, useEffect, useState } from "react";

const ListReports = () => {

    const [reports, setReports] = useState([]);

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
              <th>Go To</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
                    <tr key={report.flag_id}>
                        <td>{report.flag_id}</td>
                        <td>{report.user_id}</td>
                        <td>{report.post_id}</td>
                        <td>{(report.post_type).toString()}</td>
                        <td>
                        <button className="btn btn-outline-dark">
                            Post
                        </button>
                        </td>
                    </tr>
                ))}
          </tbody>
        </table>
    </Fragment>
};

export default ListReports;