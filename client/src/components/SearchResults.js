import React, {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";

const SearchResults = () => { 

    const [result, setResults] = useState([]);
    const [q,setQ] = useState("");
    ////////// grab query from url and print results in a table with link////////////////////

	const [searchParams, setSearchParams] = useSearchParams("");
    const searchHandler = term => {
        setSearchParams({'q': term});
    }

    //create const for query
    

//fetch function with catch
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            console.log(q);  //print query to terminal
          const response = await fetch(
                //url to the database or endpoint !!FILL IN!!
                //"http://localhost:5000/results"
                `http://localhost:5000/search/?q=${q}`
            );
            //.then(response => await response.json())
            //.then(json => setResults(json));
            const jsonData = await response.json();
            setResults(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        setQ();
    }, []);

    //returns all rows matching query, regardless of column
    // function search(rows) {
    //     //search
    //     return rows.filter(
    //         (row) => 
    //         row.className.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 ||
    //         row.profName.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1 ||
    //         row.deptName.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1
    //     );
    // }

    return (

        //search bar
        //grab text from search bar and set as 'q' (the query)
        //
        <div>
            <NavBar searchCallback={searchHandler} />
            <div className="results">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Reviews</th>
                        </tr>
                    </thead>
                    {result.map((res) => (
                        <tr key={res.name}>
                            <td>{res.name}</td>
                            <td>Link</td>
                        </tr>
                    ))}
                </table>
            </div>

        </div>

        
        
    );
}

export default SearchResults;