import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import "./loginadmin.scss";

const LoginAdmin = () => {
    const [inputs, setInputs] = useState({        
        sta_email:"",
        sta_password:"",
    })

    const [error, setError] = useState(null)
const navigate = useNavigate()

const { loginAdmin } = useContext(AuthContext)

const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
}

const handleSubmit = async e => {
    e.preventDefault();
    try {
        await loginAdmin(inputs);
        navigate("/admin");
        window.location.reload();
    } catch (error) {
        console.log(error)
        setError(error.response.data)
    }
}
    return (
        <div className="authAdmin">
            <div className="authContainer">
                <h1>Welcome Back!</h1>
                <form>
                    <input type="email" placeholder='Nhập Địa Chỉ Email...' name='sta_email' onChange={handleChange}/>
                    <input type="password" placeholder='Nhập Mật Khẩu...' name='sta_password' onChange={handleChange}/>
                    <button onClick={handleSubmit}>Đăng nhập</button>
                    <hr />
                    <Link to='/'><button className='backhome'>Trở về trang chủ</button></Link>
                    { error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginAdmin;