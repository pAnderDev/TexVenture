import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Account() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const logoutUser = async () => {
        try {
            const res = await axios.post('/logout');
            if(res.status == 200) {
                toast.success('Logged out');
                setUser(null); // Clear user from context
                navigate('/');
            } else {
                toast.error('Failed to logout');
            }
        } catch (err) {
            console.error(err);
        }
    };


     return (
        <div>
            <h1>Account</h1>
            {user ? (
                <>
                    <h2>Welcome, {user.username}!</h2>
                    /*eventually add more account dashboard and settings here*/
                    <button onClick={logoutUser}>Logout</button>
                </>
            ) : (
                <p>
                    Please <Link to="/login">login</Link> to view your account details.
                </p>
            )}
        </div>
    );
}