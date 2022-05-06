import React, { Fragment,useState } from "react";

// users can register an email and paswword
const Register = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;
    
    // allows for text typed into form to render in real time
    const onChange = e => {
        setInputs({...inputs, [e.target.name]:e.target.value});
    };

    // uses the database to regiter a user based on information put into the forms
    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {
            
            const body = {email, password}

            const response = await fetch("https://classrater.herokuapp.com/auth/register",{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            localStorage.setItem("token", parseRes.token);

            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    // renders a text input form to give an email and password, and a button to submit form
    return(
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    className="form-control my-3" 
                    value={email} 
                    onChange={e => onChange(e)} />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    className="form-control my-3" 
                    value={password} 
                    onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    )
}

export default Register;