import React, { Fragment, useState } from "react";

// allows users to login with registered email and password
const Login = ({setAuth}) => {

    const [inputs, setinputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;

    // allows for text typed into form to render in real time
    const onChange = e => {
        setinputs({ ...inputs, [e.target.name]: e.target.value });
    };

    // uses the database to login a user based on information put into the forms
    const onSubmitForm = async(e) => {
        e.preventDefault();
        const body = {email, password};
        try {
            
            const response = await fetch("https://classraterserver.herokuapp.com/auth/login", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            localStorage.setItem("token", parseRes.token);

            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
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
                    onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
        </Fragment>
    )
}

export default Login;