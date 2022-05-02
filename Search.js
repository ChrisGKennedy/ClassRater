import React, {useEffect, useState} from "react";

const Search = () => { 

    const [result, setResults] = useState([]);
    const [q,setQ] = useState("");


    useEffect(() => {

        const onSubmitForm = async () => {
            try {
                //grab query from URL
                const queryParams = new URLSearchParams(window.location.search);
                const query = queryParams.get('q');
                //Activate route
              const response = await fetch(
                    //url to the database or endpoint !!FILL IN!!
                    `http://localhost:5000/search/${query}`
                );
                //set res to the result of the search
                const jsonData = await response.json();
                setResults(jsonData);
            } catch (err) {
                console.log(err.message);
            }
        };
        onSubmitForm();
    }, []);


    return (
        <div>
            <div class="results">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Reviews</th>
                        </tr>
                    </thead>
                    {result.map((res) => (
                        //Replace .name with real cou=lumn names from the table(s)
                        <tr key={res.name}>
                            <td>{res.name}</td>
                            <td>    
                                <button>
                                {
                                //navigate(./description/?id={xxxxx})
                                //When the button is clicked, the URL will be changed to point
                                // to your page along with the corresponding unique class id
                                }
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>

        </div>

        
        
    );
}

export default Search;