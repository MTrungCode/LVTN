import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';

const ResetPassword = () => {
    const [newpassword, setNewpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null)

const handleShow = e => {
    setShow(true);
    setError("not Error");
}

const handleSubmit = e => {
    console.log([newpassword, confirmpassword]);
}
    return (
        <div>
            <h1>Khôi phục mật khẩu</h1>
            <form>
                <div className="newpass">
                    <input type={show ? "text" : "password"} placeholder='nhập khẩu mới' name='newpassword' onChange={e=>setNewpassword(e.value)}/>
                    <span>
                        {show
                            ? <VisibilityOff onClick={handleShow}/>
                            : <Visibility onClick={handleShow}/>
                        }
                    </span>
                </div>
                <input type="password" placeholder='nhập lại mật khẩu' name='confirmpassword' onChange={e=>setConfirmpassword(e.value)}/>
                <button onClick={handleSubmit}>Khôi phục</button>
                { error && <p>{error}</p>}                
            </form>
        </div>
    );
}

export default ResetPassword;