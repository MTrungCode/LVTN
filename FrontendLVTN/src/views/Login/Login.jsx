import React from 'react';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="auth">
            <h1>ĐĂNG NHẬP</h1>
            <form>
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <button>Đăng nhập</button>
                <p>Lỗi đăng nhập</p>
                <span>Bạn không có tài khoản? <Link to="/register">Đăng ký</Link></span>
                <span>Quên mật khẩu? <Link to="/regainpassword">Khôi phục mật khẩu</Link></span>
            </form>
        </div>
    );
}

export default Login;