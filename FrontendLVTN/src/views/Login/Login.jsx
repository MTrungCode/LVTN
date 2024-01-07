import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { AuthContext } from '../../context/authContext';
import "./Login.scss"

const Login = () => {
    const [inputs, setInputs] = useState({        
        email:"",
        password:"",
    })

    const [error, setError] = useState(null)
const navigate = useNavigate()

const { login } = useContext(AuthContext)

const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
}

const handleSubmit = async e => {
    e.preventDefault()
    try {
        await login(inputs)
        navigate("/")
    } catch (error) {
        setError(error.response.data)
    }
}

    return (
        <div className="auth">
            <h1>ĐĂNG NHẬP</h1>
            <form>
                <input type="email" placeholder='email' name='email' onChange={handleChange}/>
                <input type="password" placeholder='password' name='password' onChange={handleChange}/>
                <button onClick={handleSubmit}>Đăng nhập</button>
                { error && <p>{error}</p>}
                <span>Bạn không có tài khoản? <Link to="/register">Đăng ký</Link></span>
                <span>Quên mật khẩu? <Link to="/reset">Khôi phục mật khẩu</Link></span>
            </form>
        </div>
    );
}

export default Login;