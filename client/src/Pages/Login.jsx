import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

function Login() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data: responseData } = await axios.post('/login', { email, password });
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                setUser(responseData);
                setData({}); // reset the form
                navigate('/account');
            }
        } catch (error) {
            toast.error('Login failed');
        }
    };

    return (
        <div className="login-container">
            <h2>Log In</h2>
            <form className="login-form" onSubmit={loginUser}>
                <label>Email
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        autoComplete="off" 
                        value={data.email} 
                        onChange={(e) => setData({ ...data, email: e.target.value })} 
                    />
                </label>
                <label>Password
                    <input 
                        type="password" 
                        placeholder="Enter password" 
                        autoComplete="off" 
                        value={data.password} 
                        onChange={(e) => setData({ ...data, password: e.target.value })} 
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            <p>Need an Account? <Link to="/register">Register</Link></p>
        </div>
    );
}

export default Login;
