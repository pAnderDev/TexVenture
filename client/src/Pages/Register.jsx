import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const {username, email, password} = data
        try {
            const {data} = await axios.post('/register', {username, email, password})
            if(data.error) {
                toast.error(data.error)
            }
            else {
                setData({})
                toast.success("Account Created!")
                navigate('/login')
            }
        } 
        catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="register-container">
            <h2>Register</h2>
            <div className="register-form">
                <form onSubmit={registerUser}>
                    <label>Username
                        <input 
                            type="text" 
                            placeholder="Enter Username" 
                            autoComplete="off" 
                            name="username" 
                            className="form-control rounded-0" 
                            value={data.username} onChange={(e) => setData({...data, username: e.target.value})} 
                            />
                        </label>
                    <label>Email
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            autoComplete="off" 
                            name="email" 
                            className="form-control rounded-0" 
                            value={data.email} onChange={(e) => setData({...data, email: e.target.value})} 
                            />
                         </label>
                    <label>Password
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            autoComplete="off" 
                            name="password" 
                            className="form-control rounded-0" 
                            value={data.password} onChange={(e) => setData({...data, password: e.target.value})} 
                            />
                        </label>
                    <button type="submit">Register</button>
                </form>
                <p>Already Have an Account? <Link to="/login">Log In</Link></p>
            </div>
        </div>
    );
}

export default Register;