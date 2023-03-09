import React from 'react';
import { Link } from "react-router-dom";

const RegainPassword = () => {
    return (
        <div className="auth">
            <h1>KHÔI PHỤC MẬT KHẨU</h1>
            <form>
                <input type="email" placeholder='email' />
                <button>Khôi phục</button>                
                <span>Bạn đã nhớ mật khẩu? <Link to="/login">Đăng nhập</Link></span>
            </form>
        </div>
    );
}

export default RegainPassword;