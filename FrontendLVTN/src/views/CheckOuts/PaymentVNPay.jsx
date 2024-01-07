import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./CheckOuts.scss";

const PaymentVNPay = () => {
    const amount = useLocation().state;
    const [bankCode, setBankCode] = useState("");
    const [language, setLanguage] = useState("vn");

const handleSubmit = async e => {
    e.preventDefault();
    try {
        const url = await axios.post("http://localhost:5000/api/vnpays/create_payment_url",
            {amount: amount, bankCode: bankCode, language: language});
        window.open(url.data, "_self");
    } catch (error) {
        console.log(error);
    }
}
    return (
        <div className='paymentvnpay container p-5'>
            <h3>Thông tin thanh toán</h3>
            <hr />
            <div className="table-responsive">
                <form>
                    <div className="form-group">
                        <label className='label'>Số tiền</label>
                        <input type="number" disabled className="form-control" name='amount' placeholder='Số tiền' defaultValue={amount}/>
                    </div>
                    <div className="form-group">
                        <label className='label'>Chọn phương thức thanh toán:</label>
                        <div className="form-check">
                            <input type="radio" className='form-check-input' name="bankCode" id="defaultPaymentMethod" value="" checked={true} onChange={e=>setBankCode(e.value)} />
                            <label  className="form-check-label">Cổng thanh toán VNPAYQR</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className='form-check-input' name="bankCode" id="vnpayqrPaymentMethod" value="VNPAYQR" onChange={e=>setBankCode(e.value)} />
                            <label  className="form-check-label">Thanh toán qua ứng dụng hỗ trợ VNPAYQR</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className='form-check-input' name="bankCode" id="vnbankPaymentMethod" value="VNBANK" onChange={e=>setBankCode(e.value)} />
                            <label  className="form-check-label">Thanh toán qua ATM-Tài khoản ngân hàng nội địa</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className='form-check-input' name="bankCode" id="intcardPaymentMethod" value="INTCARD" onChange={e=>setBankCode(e.value)} />
                            <label  className="form-check-label">Thanh toán qua thẻ quốc tế</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className='label'>Ngôn ngữ</label>
                        <div className="form-check">
                            <input type="radio" className='form-check-input' name="language" id="vnLanguage" value="vn" checked={true} onChange={e=>setLanguage(e.value)} />
                            <label className="form-check-label">Tiếng việt</label>
                        </div>
                        <div className="form-check">
                            <input className='form-check-input' type="radio" name="language" id="enLanguage" value="en" onChange={e=>setLanguage(e.value)} />
                            <label className="form-check-label">Tiếng anh</label>
                        </div>                        
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Thanh toán</button>
                </form>
            </div>
        </div>
    );
}

export default PaymentVNPay;