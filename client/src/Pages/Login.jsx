import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

function Login() {
    
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault()
        const {email, password} = data
        try {
            const {data} = await axios.post('/login', {
                email,
                password
            });
            if(data.error) {
                toast.error(data.error)
            } else {
                setData({}); //reset the form
                navigate('/account')
            }
        } catch(error) {

        }
    }

    return(
        <div>
            <form onSubmit={loginUser}>
                <label>Email<input type="email" placeholder="Enter email" autoComplete="false" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/></label>
                <label>Password<input type="password" placeholder="Enter password" autoComplete="false" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/></label>
            <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;