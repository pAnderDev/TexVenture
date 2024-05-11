import { useState } from "react"
import axios from 'axios'

function Login() {
    
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = (e) => {
        e.preventDefault()
        axios.get('/')
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