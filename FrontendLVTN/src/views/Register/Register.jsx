import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Register.scss";
import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
        birthday: "",
        phone: "",
    });

    const [reCaptcha, setReCaptcha] = useState(false);

    const navigate = useNavigate();

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            await axios.post("http://localhost:5000/api/auths/register", inputs);
            navigate("/login");
        } catch (error) {            
            toast.error(error.response.data, {
                position: "bottom-right",
                autoClose: 100,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setReCaptcha(false);
        }
    };
    return (
        <div className="authRegister">
            <h1>ĐĂNG KÝ</h1>
            <ToastContainer
                position="bottom-right"
                autoClose={100}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <form>
                <input type="text" placeholder='Tên người dùng' name='username' onChange={handleChange} />
                <div className='radioBox'>
                    <input type="radio" value="0" name='gender' onChange={handleChange} />
                    <label htmlFor="">Nam</label>
                    <input type="radio" value="1" name='gender' onChange={handleChange} />
                    <label htmlFor="">Nữ</label>
                </div>
                <input type="email" placeholder='email' name='email' onChange={handleChange} />
                <input type="date" placeholder='dd/mm/yyyy' name='birthday' onChange={handleChange} />
                <input type="number" placeholder='Điện thoại' name='phone' onChange={handleChange} />
                <input type="password" placeholder='Mật khẩu' name='password' onChange={handleChange} />
                <ReCAPTCHA                    
                    sitekey='6LcdwnkoAAAAAHw4maW4-1cia6Pt2Zve_sa5wcQM'
                    onChange={() => setReCaptcha(true)}
                    onExpired={() => setReCaptcha(false)}
                />
                { reCaptcha && <button onClick={handleSubmit}>Đăng ký</button> }                
                <span>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></span>
            </form>
        </div>
    );
}

export default Register;