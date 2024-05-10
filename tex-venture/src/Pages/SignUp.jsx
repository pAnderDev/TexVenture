import { useState } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';

function SignUp() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('', {name, email, password})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    return(
        <div className="">
            <div className="">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Name</strong></label>
                        <input type="text" placeholder="Enter Name" autoComplete="off" name="name" className="form-control rounded-0" onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" autoComplete="off" name="password" className="form-control rounded-0" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <button type="submit" className="">Register</button>
                </form>
                <p>Alreadty Have an Account</p>
                <Link to="/login" className="">Log In</Link>
            </div>
        </div>
    );
}

export default SignUp;