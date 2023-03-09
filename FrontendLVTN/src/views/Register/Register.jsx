import React from 'react';
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="authRegister">
            <h1>ĐĂNG KÝ</h1>
            <form>
                <input type="text" placeholder='Tên người dùng' />
                <div className='radioBox'>
                    <input type="radio" value="0" name='gender'/>
                    <label htmlFor="">Nam</label>
                    <input type="radio" value="1" name='gender'/>
                    <label htmlFor="">Nữ</label>
                </div>
                <input type="email" placeholder='email' />
                <input type="text" placeholder='dd/mm/yyyy'/>
                <input type="text" placeholder='Điện thoại' />
                <input type="text" placeholder='Địa chỉ' />
                <input type="password" placeholder='Mật khẩu' />
                <div className="rule">
                    <input type="radio" value="1" name=''/>
                    <span className='GPP_TOS'>This site is protected by reCAPTCHA and the 
                        <Link to='https://policies.google.com/privacy'>Google Privacy Policy</Link> and 
                        <Link to='https://policies.google.com/terms'>Terms of Service</Link> apply.
                    </span>
                </div>
                <button>Đăng ký</button>
                <p>Lỗi đăng nhập</p>
                <span>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></span>                
            </form>
        </div> 
    );
}

export default Register;