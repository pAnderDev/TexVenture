import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import dotenv from "dotenv";

function SignUp() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await axios.post('https://localhost:5050/user', {name, email, password});
            setMessage(result.data.message);
            console.log(result.data);
        } catch (err) {
            console.error(err);
            setMessage('Failed to register');
        }
    };

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
                    <button type="submit">Register</button>
                </form>
                {message && <p>{message}</p>}
                <p>Alreadty Have an Account</p>
                <Link to="/login">Log In</Link>
            </div>
        </div>
    );
}

export default SignUp;