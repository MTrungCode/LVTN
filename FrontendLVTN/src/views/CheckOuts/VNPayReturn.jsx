import React, { useEffect, useState } from 'react';
import './CheckOuts.scss';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const VNPayReturn = () => {
    const query = useLocation().search;
    const [code, setCode] = useState();

    useEffect(() => {
        const getCode = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/vnpays/vnpay_return/${query}`);
                setCode(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCode();
    }, [query]);
    console.log(code);
    return (
        <div className='paymentvnpay container p-5'>
            <h3 className='text-center'>
            {code === '00'
                ? "Giao dịch thành công"
                : "Giao dịch thất bại"
            }
            </h3>
            <hr />
            <div style={{ textAlign: "center" }}>
                <button className="btn btn-primary"><Link to="/" className='text-light'>Về trang chủ</Link></button>
            </div>
        </div>
    );
}

export default VNPayReturn;