import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EnterEmail = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null)

const handleRestore = e => {
    console.log(email);
    setError("not error");
}
    return (
        <div>
            <h1>Khôi phục mật khẩu</h1>
            <form>
                <label htmlFor="email">Nhập email của bạn:</label>
                <input type="email" placeholder='Vui lòng nhập email của bạn' id='email' name='email' onChange={e=>setEmail(e.value)}/>                
                <button onClick={handleRestore}>Khôi phục</button>
                { error && <p>{error}</p>}                
                <span>Bạn đã nhớ mật khẩu? <Link to="/login">Quay lại đăng nhập</Link></span>
            </form>
        </div>
    );
}

export default EnterEmail;